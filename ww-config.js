function showObjectPropertyPath(basePropertyKey, {content, boundProps}) {
  return boundProps[basePropertyKey] && content[basePropertyKey] && typeof wwLib.wwCollection.getCollectionData(content[basePropertyKey])[0] === 'object'
}
function getObjectPropertyPathOptions(basePropertyKey, {content}) {
  const data = wwLib.wwCollection.getCollectionData(content[basePropertyKey])
  if (!data.length || typeof data[0] !== 'object') {
      return null;
  }

  return { object: data[0] };
}

export default {
  editor: {
    label: {
      en: 'Kanban',
    },
    customSettingsPropertiesOrder: ['items', ['itemKey', 'stackedBy', 'sortedBy', 'allowManualSort']]
  },
  triggerEvents: [
    { 
      name: 'item:moved',
      label: { en: 'On item moved' },
      event: { 
        item: {},
        from: '',
        to: '',
        oldIndex: 0,
        newIndex: 1,
        updatedList: []
      } 
    },
  ],
  properties: {
    stackElement: {
      hidden: true,
      //ww-stack
      defaultValue: { isWwObject: true, type: '5a88036f-22ea-4f8d-b4a5-bc226ef95061' },
    },
    items: {
      label: {
        en: 'Items',
      },
      type: 'Info',
      options: {
        text: { en: 'Bind your data' }
      },
      bindable: true,
      defaultValue: [],
      section: 'settings',
    },
    itemKey: {
      hidden: (content, sidepanelContent, boundProps) => !showObjectPropertyPath('items', {content, boundProps}),
      label: {
          en: 'Item key',
      },
      type: 'ObjectPropertyPath',
      options: content => getObjectPropertyPathOptions('items', {content}),
      defaultValue: null,
      section: 'settings',
    },
    stackedBy: {
      hidden: (content, sidepanelContent, boundProps) => !showObjectPropertyPath('items', {content, boundProps}),
      label: {
          en: 'Stacked by',
      },
      type: 'ObjectPropertyPath',
      options: content => getObjectPropertyPathOptions('items', {content}),
      defaultValue: null,
      section: 'settings',
    },
    sortedBy: {
      hidden: (content, sidepanelContent, boundProps) => !showObjectPropertyPath('items', {content, boundProps}),
      label: {
          en: 'Sorted by',
      },
      type: 'ObjectPropertyPath',
      options: content => getObjectPropertyPathOptions('items', {content}),
      defaultValue: null,
      section: 'settings',
    },
    sortable: {
      hidden: (content, sidepanelContent, boundProps) => !showObjectPropertyPath('items', {content, boundProps}),
      label: {
        en: 'Sortable',
      },
      type: 'OnOff',
      defaultValue: true,
      section: 'settings',
    },
    uncategorizedStack: {
      label: {
        en: 'Uncategorized stack',
      },
      type: 'OnOff',
      defaultValue: false,
      section: 'settings'
    },
    stacks: {
      label: {
        en: 'Stacks',
      },
      type: 'Array',
      bindable: true,
      options: {
        movable: true,
        getItemLabel(_, index) {
          return `Stack ${index + 1}`;
        },
        item: {
          type: 'Object',
          defaultValue: {label: '', value: ''},
          options: {
            item: {
                label: {
                    label: { en: 'Label' },
                    type: 'Text',
                },
                value: {
                  label: { en: 'Value' },
                  type: 'Text'
                },
            },
          },
        },
      },
      defaultValue: [{label: 'Todo', value: 'todo'}, {label: 'In progress', value: 'wip'}, {label: 'Done', value: 'done'}],
      section: 'settings',
    },
    stackLabel: {
      hidden: (content, sidepanelContent, boundProps) => !showObjectPropertyPath('stacks', {content, boundProps}),
      label: {
          en: 'Label',
      },
      type: 'ObjectPropertyPath',
      options: content => getObjectPropertyPathOptions('items', {content}),
      defaultValue: null,
      section: 'settings',
    },
    stackValue: {
      hidden: (content, sidepanelContent, boundProps) => !showObjectPropertyPath('stacks', {content, boundProps}),
      label: {
          en: 'Value',
      },
      type: 'ObjectPropertyPath',
      options: content => getObjectPropertyPathOptions('items', {content}),
      defaultValue: null,
      section: 'settings',
    },
  },
};
