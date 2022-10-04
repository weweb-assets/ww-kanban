function isBindValid(basePropertyKey, {content, boundProps}) {
  return boundProps[basePropertyKey] && content[basePropertyKey]
}
function getFormulaOptions(basePropertyKey, {content}) {
  const data = wwLib.wwCollection.getCollectionData(content[basePropertyKey])
  return { template: data.length ? data[0] : null};
}

export default {
  editor: {
    label: {
      en: 'Kanban',
    },
    bubble: {
      icon: 'fontawesome/solid/trello-brands',
    },
    icon: 'fontawesome/solid/trello-brands',
    customSettingsPropertiesOrder: ['items', ['itemKey', 'stackedBy', 'sortedBy', 'sortOrder']]
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
      },
      getTestEvent: 'getTestEvent',
      default: true
    },
  ],
  properties: {
    stackElement: {
      hidden: true,
      //ww-stack
      defaultValue: { isWwObject: true, type: '5a88036f-22ea-4f8d-b4a5-bc226ef95061' },
    },
    wrapStacks: {
      label: {
        en: 'Wrap stacks',
      },
      type: 'OnOff',
      defaultValue: true
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
      hidden: (content, sidepanelContent, boundProps) => !isBindValid('items', {content, boundProps}),
      label: {
          en: 'Item key',
      },
      type: 'Formula',
      options: content => getFormulaOptions('items', {content}),
      section: 'settings',
    },
    stackedBy: {
      hidden: (content, sidepanelContent, boundProps) => !isBindValid('items', {content, boundProps}),
      label: {
          en: 'Stacked by',
      },
      type: 'Formula',
      options: content => getFormulaOptions('items', {content}),
      section: 'settings',
    },
    sortedBy: {
      hidden: (content, sidepanelContent, boundProps) => !isBindValid('items', {content, boundProps}),
      label: {
          en: 'Sorted by',
      },
      type: 'Formula',
      options: content => getFormulaOptions('items', {content}),
      section: 'settings',
    },
    sortOrder: {
      hidden: (content, sidepanelContent, boundProps) => !isBindValid('items', {content, boundProps}) || !content.sortedBy,
      label: {
        en: 'Sort order'
      },
      type: 'TextRadioGroup',
      options: {
        choices: [
          {
            label: { en: 'Asc' },
            value: 'asc',
            default: true,
          },
          {
            label: { en: 'Desc' },
            value: 'desc',
          },
        ]
      },
      defaultValue: 'asc',
      bindable: true,
      section: 'settings'
    },
    sortable: {
      hidden: (content, sidepanelContent, boundProps) => !isBindValid('items', {content, boundProps}),
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
        expandable: true,
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
      hidden: (content, sidepanelContent, boundProps) => !isBindValid('stacks', {content, boundProps}),
      label: {
          en: 'Stack label',
      },
      type: 'Formula',
      options: content => getFormulaOptions('stacks', {content}),
      section: 'settings',
    },
    stackValue: {
      hidden: (content, sidepanelContent, boundProps) => !isBindValid('stacks', {content, boundProps}),
      label: {
          en: 'Stack value',
      },
      type: 'Formula',
      options: content => getFormulaOptions('stacks', {content}),
      section: 'settings',
    },
  },
};
