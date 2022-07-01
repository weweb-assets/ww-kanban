<template>
  <div class="ww-kanban">
    <div v-if="content.uncategorizedStack" class="ww-kanban-stack">
      <wwLayoutItemContext index="0" :item="uncategorizedStack" :data="uncategorizedStack" is-repeat>
        <draggable 
          :list="uncategorizedStack.items" 
          :item-key="content.itemKey || 'id'"
          :clone="el => el"
          group="stacks" 
          :sort="content.allowFreeOrdering"
          @change="handleChange($event, null)"
        >
          <template #header>
            <wwLayout path="headerElement"></wwLayout>
          </template>
          <template #item="{ element, index: itemIndex }">
            <div>
              <wwLayoutItemContext :index="itemIndex" :item="element" is-repeat :data="element">
                <wwLayout path="itemElement"></wwLayout>
              </wwLayoutItemContext>
            </div>
          </template>
          <template #footer>
            <wwLayout path="footerElement"></wwLayout>
          </template>
        </draggable>
      </wwLayoutItemContext>
    </div>

    <div v-for="(stack, index) in internalStacks" class="ww-kanban-stack">
      <wwLayoutItemContext :index="index" :item="stack" is-repeat :data="stack">
        <wwLayout path="stackElement">
          <template #default>
            <draggable 
              :list="stack.items" 
              :item-key="content.itemKey || 'id'"
              :clone="el => el"
              group="stacks" 
              :sort="content.allowFreeOrdering"
              @change="handleChange($event, stack.value)"
            >
              <template #header>
                <wwLayout path="headerElement"></wwLayout>
              </template>
              <template #item="{ element, index: itemIndex }">
                <div>
                  <wwLayoutItemContext :index="itemIndex" :item="element" is-repeat :data="element">
                    <wwLayout path="itemElement"></wwLayout>
                  </wwLayoutItemContext>
                </div>
              </template>
              <template #footer>
                <wwLayout path="footerElement"></wwLayout>
              </template>
            </draggable>
          </template>
        </wwLayout>
      </wwLayoutItemContext>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
  },
  props: {
    content: { type: Object, required: true },
  },
  data: () => ({
    drag: false,
    internalStacks: []
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
    uncategorizedStack() {
      const stacksList = this.stacks.map(stack => wwLib.resolveObjectPropertyPath(stack, this.content.stackValue || 'value'))
      return {
        label: 'Uncategorized',
        value: null,
        items: this.items.filter(item => !stacksList.includes(wwLib.resolveObjectPropertyPath(item, this.content.stackedBy)))
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
    },
    handleChange(change, stackValue) {
      if (change.moved) {
        this.$emit('trigger-event', { 
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
        this.$emit('trigger-event', {
          name: 'item:moved',
          event: {
            item: change.added.element,
            from: wwLib.resolveObjectPropertyPath(change.added.element, this.content.stackedBy),
            to: stackValue,
            oldIndex: null,
            newIndex: change.added.newIndex,
          }
        })
      }
    }
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
