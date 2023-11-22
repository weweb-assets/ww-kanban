function showObjectPropertyPath(basePropertyKey, { content, boundProps }) {
    return (
        boundProps[basePropertyKey] &&
        content[basePropertyKey] &&
        typeof wwLib.wwCollection.getCollectionData(content[basePropertyKey])[0] === "object"
    );
}
function getObjectPropertyPathOptions(basePropertyKey, { content }) {
    const data = wwLib.wwCollection.getCollectionData(content[basePropertyKey]);
    if (!data.length || typeof data[0] !== "object") {
        return null;
    }

    return { object: data[0] };
}

export default {
    editor: {
        label: {
            en: "Kanban",
        },
        bubble: {
            icon: "template",
        },
        icon: "template",
        customSettingsPropertiesOrder: [
            "items",
            ["itemKey", "stackedBy", "sortedBy", "sortOrder"],
            "readonly",
            "customDragHandle",
            ["handleClass"],
        ],
    },
    states: ['readonly'],
    triggerEvents: [
        {
            name: "item:moved",
            label: { en: "On item moved" },
            event: {
                item: {},
                from: "",
                to: "",
                oldIndex: 0,
                newIndex: 1,
                updatedList: [],
            },
            getTestEvent: "getTestEvent",
            default: true,
        },
    ],
    properties: {
        stackElement: {
            hidden: true,
            //ww-stack
            defaultValue: { isWwObject: true, type: "5a88036f-22ea-4f8d-b4a5-bc226ef95061" },
        },
        wrapStacks: {
            label: {
                en: "Wrap stacks",
            },
            type: "OnOff",
            defaultValue: true,
            responsive: true,
            bindable: true,
            states: true,
            classes: true,
        },
        items: {
            label: {
                en: "Items",
            },
            type: "Info",
            options: {
                text: { en: "Bind your data" },
            },
            bindable: true,
            defaultValue: [],
            section: "settings",
        },
        itemKey: {
            hidden: (content, sidepanelContent, boundProps) =>
                !showObjectPropertyPath("items", { content, boundProps }),
            label: {
                en: "Item key",
            },
            type: "ObjectPropertyPath",
            options: (content) => getObjectPropertyPathOptions("items", { content }),
            defaultValue: null,
            section: "settings",
        },
        stackedBy: {
            hidden: (content, sidepanelContent, boundProps) =>
                !showObjectPropertyPath("items", { content, boundProps }),
            label: {
                en: "Stacked by",
            },
            type: "ObjectPropertyPath",
            options: (content) => getObjectPropertyPathOptions("items", { content }),
            defaultValue: null,
            section: "settings",
        },
        sortedBy: {
            hidden: (content, sidepanelContent, boundProps) =>
                !showObjectPropertyPath("items", { content, boundProps }),
            label: {
                en: "Sorted by",
            },
            type: "ObjectPropertyPath",
            options: (content) => getObjectPropertyPathOptions("items", { content }),
            defaultValue: null,
            section: "settings",
        },
        sortOrder: {
            hidden: (content, sidepanelContent, boundProps) =>
                !showObjectPropertyPath("items", { content, boundProps }) || !content.sortedBy,
            label: {
                en: "Sort order",
            },
            type: "TextRadioGroup",
            options: {
                choices: [
                    {
                        label: { en: "Asc" },
                        value: "asc",
                        default: true,
                    },
                    {
                        label: { en: "Desc" },
                        value: "desc",
                    },
                ],
            },
            defaultValue: "asc",
            bindable: true,
            section: "settings",
        },
        sortable: {
            hidden: (content, sidepanelContent, boundProps) =>
                !showObjectPropertyPath("items", { content, boundProps }),
            label: {
                en: "Sortable",
            },
            type: "OnOff",
            defaultValue: true,
            section: "settings",
        },
        uncategorizedStack: {
            label: {
                en: "Uncategorized stack",
            },
            type: "OnOff",
            defaultValue: false,
            section: "settings",
        },
        stacks: {
            label: {
                en: "Stacks",
            },
            type: "Array",
            bindable: true,
            options: {
                movable: true,
                expandable: true,
                getItemLabel(_, index) {
                    return `Stack ${index + 1}`;
                },
                item: {
                    type: "Object",
                    defaultValue: { label: "", value: "" },
                    options: {
                        item: {
                            label: {
                                label: { en: "Label" },
                                type: "Text",
                            },
                            value: {
                                label: { en: "Value" },
                                type: "Text",
                            },
                        },
                    },
                },
            },
            defaultValue: [
                { label: "Todo", value: "todo" },
                { label: "In progress", value: "wip" },
                { label: "Done", value: "done" },
            ],
            section: "settings",
        },
        stackLabel: {
            hidden: (content, sidepanelContent, boundProps) =>
                !showObjectPropertyPath("stacks", { content, boundProps }),
            label: {
                en: "Label",
            },
            type: "ObjectPropertyPath",
            options: (content) => getObjectPropertyPathOptions("stacks", { content }),
            defaultValue: null,
            section: "settings",
        },
        stackValue: {
            hidden: (content, sidepanelContent, boundProps) =>
                !showObjectPropertyPath("stacks", { content, boundProps }),
            label: {
                en: "Value",
            },
            type: "ObjectPropertyPath",
            options: (content) => getObjectPropertyPathOptions("stacks", { content }),
            defaultValue: null,
            section: "settings",
        },
        readonly: {
            label: { en: "Read only", fr: "Lecture seule" },
            type: "OnOff",
            section: "settings",
            bindable: true,
            defaultValue: false,
            hidden: (content, sidePanelContent, boundProps, wwProps) => !!(wwProps && wwProps.readonly !== undefined),
            /* wwEditor:start */
            bindingValidation: {
                type: "boolean",
                tooltip: "A boolean that defines if the input is in readonly: `true | false`",
            },
            /* wwEditor:end */
        },
        customDragHandle: {
            label: 'Custom drag',
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            propertyHelp: {
                tooltip: `By default, dragging is triggered when a user clicks anywhere on a Kanban item. To trigger the dragging behavior on click of a specific element inside the item:  
* enable this option  
* go to that element’s Settings > HTML attributes, and  
* add the class you choose to its Class attribute.`
            },
            hidden: (content, sidePanelContent, boundProps, wwProps) => wwProps?.handle?.length,
        },
        handleClass: {
            label: "Handle class",
            type: "Text",
            bindable: true,
            section: "settings",
            defaultValue: "draggable",
            propertyHelp: {
                tooltip: 'This class must be added on elements to trigger the drag&drop. (Settings > HTML attributes > Class)'
            },
            options: {
                placeholder: "draggable",
            },
            /* wwEditor:start */
            bindingValidation: {
                type: "string",
                tooltip: "A string that represent the class of the handle",
            },
            /* wwEditor:end */
            hidden: (content, sidePanelContent, boundProps, wwProps) => !content.customDragHandle || wwProps?.handle?.length,
        },
    },
};
