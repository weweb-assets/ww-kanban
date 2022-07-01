<template>
  <div class="ww-kanban">
    <div v-if="content.uncategorizedStack" class="ww-kanban-stack">
      <wwLayoutItemContext :index="0" :item="uncategorizedStack" :data="uncategorizedStack" is-repeat>
        <wwElement 
          v-bind="content.stackElement" 
          :ww-props="{ ...stackConfig, items: uncategorizedStack.items, stack: null }"
        ></wwElement>
      </wwLayoutItemContext>
    </div>

    <div v-for="(stack, index) in internalStacks" class="ww-kanban-stack">
      <wwLayoutItemContext :index="index" :item="stack" is-repeat :data="stack">
        <wwElement 
          v-bind="content.stackElement" 
          :ww-props="{ ...stackConfig, items: stack.items, stack: stack.value }"
        ></wwElement>
      </wwLayoutItemContext>
    </div>
  </div>
</template>

<script>
import { provide } from 'vue'

export default {
  props: {
    content: { type: Object, required: true },
    uid: { type: String, required: true },
  },
  emits: ['trigger-event', 'update:content:effect'],
  setup(props, {emit}) {
    provide('customHandler', (change, {stack: stackValue}) => {
      if (change.moved) {
        emit('trigger-event', { 
          name: 'item:moved', 
          event: { 
            item: change.moved.element,
            from: stackValue,
            to: stackValue,
            oldIndex: change.moved.oldIndex,
            newIndex: change.moved.newIndex,
          }
        })
      }

      if (change.added) {
        emit('trigger-event', {
          name: 'item:moved',
          event: {
            item: change.added.element,
            from: wwLib.resolveObjectPropertyPath(change.added.element, props.content.stackedBy),
            to: stackValue,
            oldIndex: null,
            newIndex: change.added.newIndex,
          }
        })
      }
    })
  },
  data: () => ({
    internalStacks: [],
    uncategorizedStack: {
      label: 'Uncategorized',
      value: null,
      items: []
    }
  }),
  computed: {
    stacks() {
      const stacks = wwLib.wwCollection.getCollectionData(this.content.stacks)
      if (!Array.isArray(stacks)) return []
      return stacks
    },
    items() {
      const items = wwLib.wwCollection.getCollectionData(this.content.items)
      if (!Array.isArray(items)) return []
      return items
    },
    stackConfig() {
      return {
        sortable: this.content.sortable, 
        group: 'kanban-' + this.uid,
        itemKey: this.content.itemKey
      }
    }
  },
  watch: {
    'content.stackedBy'() {
      this.refreshStacks()
    },
    'content.sortedBy'() {
      this.refreshStacks()
    },
    stacks() {
      this.refreshStacks()
    },
    items() {
      this.refreshStacks()
    }
  },
  methods: {
    refreshStacks(truc) {
      this.internalStacks = this.stacks
          .map(stack => ({
            label: wwLib.resolveObjectPropertyPath(stack, this.content.stackLabel || 'label') || '',
            value: wwLib.resolveObjectPropertyPath(stack, this.content.stackValue || 'value') || '',
          }))
          .map(stack => ({
            ...stack,
            items: this.items
              .filter(item => wwLib.resolveObjectPropertyPath(item, this.content.stackedBy) === stack.value)
              .sort((a, b) => wwLib.resolveObjectPropertyPath(a, this.content.sortedBy) > wwLib.resolveObjectPropertyPath(b, this.content.sortedBy) ? 1 : -1)
          }))
      const stacksList = this.stacks.map(stack => wwLib.resolveObjectPropertyPath(stack, this.content.stackValue || 'value'))
      this.uncategorizedStack.items = this.items.filter(item => !stacksList.includes(wwLib.resolveObjectPropertyPath(item, this.content.stackedBy)))
    },
  },
  created() {
    this.refreshStacks()
  }
};
</script>

<style lang="scss" scoped>
.ww-kanban {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
