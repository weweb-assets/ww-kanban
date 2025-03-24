---
name: ww-kanban
description: Kanban board for organizing items into categorized stacks with drag-and-drop functionality. This component requires the ww-stack component. Include ww-stack in the documentation if ww-kanban is required.
keywords:
  - kanban
  - board
  - draggable
  - sortable
  - stacks
  - cards
  - tasks
  - organization
---

#### ww-kanban

***Description***: A Kanban board component that organizes items into movable stacks with drag-and-drop functionality. To create one use the example below.

***Specifications***:
- Display must be one of: `flex` or `inline-flex`
- Items must be bound to an array of objects
- Stacks can be defined manually or through data binding
- Items can be sorted within stacks and moved between stacks
- Default stacks: Todo, In Progress, Done
- Supports an "Uncategorized" stack for items without a stack value
- Drag-and-drop can be customized with cursor style and drag handles

***Properties***:
- `items`: Array of objects to display in the Kanban board (bindable)
- `stacks`: Array of stack objects with label and value properties (bindable)
- `stackedBy`: Property path of the item that determines its stack
- `sortedBy`: Property path to sort items within stacks
- `sortOrder`: Sort direction - "asc" or "desc" (default: "asc")
- `itemKey`: Unique identifier property path for items
- `wrapStacks`: Whether stacks should wrap to new rows (default: true)
- `uncategorizedStack`: Show a stack for items without a stack value (default: false)
- `sortable`: Enable drag-and-drop sorting (default: true)
- `readonly`: Disable all drag-and-drop functionality (default: false)
- `draggingCursor`: Cursor style while dragging (default: "grabbing")
- `customDragHandle`: Use a custom element as drag handle (default: false)
- `handleClass`: CSS class for custom drag handles (default: "draggable")

***Events***:
- `item:moved`: Triggered when an item is moved within or between stacks
  - Event data:
    - `item`: The moved item object
    - `from`: Source stack value
    - `to`: Destination stack value 
    - `oldIndex`: Original position index
    - `newIndex`: New position index
    - `updatedList`: Updated array of items

***Variables***:
- `isDragging`: Boolean indicating if an item is currently being dragged

***Children***:
- `stackElement`: ww-stack component used to render each stack in the kanban board.

Example:
<elements>
{"uid":0,"tag":"ww-kanban","name":"Kanban","props":{"default":{"items":{"defaultValue":[],"wwFormula":"variables['a92e4eea-5423-41fa-b584-9ca4412e7837']"},"stacks":[{"label":"Todo","value":"todo"},{"label":"In progress","value":"in-progress"},{"label":"Done","value":"done"}],"itemKey":"['id']","readonly":false,"sortable":true,"sortedBy":"['id']","sortOrder":"desc","stackedBy":"['status']","wrapStacks":true,"handleClass":"draggable","customDragHandle":false,"uncategorizedStack":false,"draggingCursor":"grabbing"}},"styles":{"default":{"flex":"1 0 auto","minHeight":"800px"}},"children":{"stackElement":{"uid":1}}}
{"uid":1,"tag":"ww-stack","name":"Column","states":[{"id":"_wwHover","label":"Hover"}],"props":{"default":{"group":"common","readonly":false,"sortable":true,"handleClass":"draggable","customDragHandle":false}},"styles":{"default":{"width":"300px","height":"auto","padding":"16px","minHeight":"800px","backgroundColor":"#FFFFFF"}},"children":{"itemElement":[{"uid":2}],"headerElement":[{"uid":8}]}}
{"uid":2,"tag":"ww-flexbox","name":"Card","states":[{"id":"_wwHover","label":"Hover"}],"settings":{},"styles":{"default":{"width":"100%","border":"1px solid #E4E4E7","cursor":"pointer","margin":"0 0 10px 0","boxShadow":null,"transition":"box-shadow 0.3s ease 0s","borderRadius":"8px","flexWrap":true,"alignItems":"stretch","flexDirection":"row","justifyContent":"center"},"_wwHover_default":{"boxShadow":"1px 4px 12px 0px #E4E4E7"}},"children":{"children":[{"uid":3},{"uid":4}]}}
{"uid":3,"tag":"ww-image","name":"image","props":{"default":{"alt":{"en":""},"url":{"defaultValue":"https://cdn.weweb.app/public/images/no_image_selected.png","wwFormula":"context.item.data?.['img']"},"loading":"lazy","objectFit":"cover"}},"styles":{"default":{"width":"100%","maxHeight":"136px","borderRadius":"8px 8px 0px 0px"}}}
{"uid":4,"tag":"ww-flexbox","name":"container","styles":{"default":{"width":"100%","padding":"12px","rowGap":"12px","flexWrap":true,"alignItems":"stretch","flexDirection":"row","justifyContent":"flex-start"}},"children":{"children":[{"uid":5},{"uid":6}]}}
{"uid":5,"tag":"ww-text","props":{"default":{"tag":"p","bgColor":"","shadows":"","fontStyle":"ww-font-style-text","textColor":"","transformation":"","text":{"en":{"defaultValue":"<p>This is some text</p>","wwFormula":"context.item.data['title']"}}}},"styles":{"default":{"fontSize":"14px"}}}
{"uid":6,"tag":"ww-flexbox","name":"container","styles":{"default":{"width":"100%","padding":"0px","flexWrap":true,"alignItems":"center","flexDirection":"row","justifyContent":"space-between"}},"children":{"children":[{"uid":7}]}}
{"uid":7,"tag":"ww-text","props":{"default":{"tag":"p","bgColor":"","shadows":"","fontStyle":"ww-font-style-text","textColor":"","transformation":"","text":{"en":{"defaultValue":"<p>This is some text</p>","wwFormula":"context.item.data['createdAt']"}}}},"styles":{"default":{"color":"#52525B","fontSize":"12px"}}}
{"uid":8,"tag":"ww-flexbox","name":"container","styles":{"default":{"width":"100%","margin":"0 0 16px 0","alignItems":"center","flexDirection":"row","justifyContent":"space-between"}},"children":{"children":[{"uid":9},{"uid":10}]}}
{"uid":9,"tag":"ww-text","name":"name","props":{"default":{"tag":"p","text":{"en":{"defaultValue":"New text","wwFormula":"context.item.data['label']"}}}},"styles":{"default":{"color":"#18181B","fontSize":"14px","fontWeight":400,"lineHeight":"20px","wordSpacing":"0px","letterSpacing":"0px","textDecoration":"none","textDecorationStyle":"solid"}}}
{"uid":10,"tag":"ww-button","settings":{},"props":{"default":{"disabled":false,"fontStyle":"ww-font-style-text","buttonType":"button","hasLeftIcon":true,"hasRightIcon":false,"backgroundColor":"","text":{"en":"<div>Add</div>"}}},"styles":{"default":{"align":"flex-start","border":"1px solid #E4E4E7","cursor":"pointer","display":true,"padding":"4px 12px","borderRadius":"8px","backgroundColor":"#FFFFFF","color":"#3F3F46","fontSize":"14px","letterSpacing":"0px","textDecoration":"none","textDecorationStyle":"solid"}},"children":{"leftIcon":{"uid":11}}}
{"uid":11,"tag":"ww-icon","props":{"default":{"icon":"icon-plus","color":"#3F3F46","fontSize":12}},"styles":{"default":{"margin":"0 4px 0 0"}}}
{"uid":13,"tag":"ww-flexbox","name":"Drawer - Details","styles":{"default":{"top":"0px","right":"0px","width":"580px","height":"100vh","margin":"0","zIndex":100,"display":true,"padding":"0px","position":"fixed","boxShadow":"0px 4px 12px 0px #0000001A","customCss":{},"transform":{"defaultValue":"scale3d(1,1,1) translate3d(1000px,0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)","wwFormula":"wwFormulas.if(variables['402df1b8-0a02-4cda-956d-a81585b01ddd'],\"translateX(0)\",\"translateX(1000px)\")"},"transition":"all 0.3s ease 0s","borderRadius":"6px","backgroundColor":"#FFFFFF","flexWrap":true,"alignItems":"center","flexDirection":"column","justifyContent":"flex-start"}},"children":{"children":[{"uid":14},{"uid":17},{"uid":18}]}}
{"uid":14,"tag":"ww-flexbox","name":"div","styles":{"default":{"width":"100%","padding":"24px","flexWrap":true,"alignItems":"center","flexDirection":"row","justifyContent":"space-between"}},"children":{"children":[{"uid":15},{"uid":16}]}}
{"uid":15,"tag":"ww-text","props":{"default":{"tag":"p","bgColor":"","shadows":"","fontStyle":"ww-font-style-text","textColor":"","transformation":"","text":{"en":"<div>Freelancer</div>"}}},"styles":{"default":{"padding":"0px","fontSize":"18px","letterSpacing":"0px","textDecoration":"none","textDecorationStyle":"solid"}}}
{"uid":16,"tag":"ww-icon","settings":{},"props":{"default":{"icon":"fas fa-times","color":"#999999","fontSize":18}},"styles":{"default":{"width":"46px","cursor":"pointer","height":"unset","padding":"0px","aspectRatio":1,"borderRadius":"100%"}}}
{"uid":17,"tag":"ww-image","props":{"default":{"alt":{"en":""},"url":"https://cdn.weweb.app/public/images/no_image_selected.png","loading":"lazy","objectFit":"cover"}},"styles":{"default":{"width":"100%","maxHeight":"120px"}}}
{"uid":18,"tag":"ww-flexbox","name":"container","styles":{"default":{"width":"100%","padding":"16px","flexWrap":true,"alignItems":"stretch","flexDirection":"column","justifyContent":"center"}},"children":{"children":[{"uid":19},{"uid":20},{"uid":21},{"uid":24},{"uid":25}]}}
{"uid":19,"tag":"ww-text","props":{"default":{"tag":"p","bgColor":"","shadows":"","fontStyle":"ww-font-style-text","textColor":"","transformation":"","text":{"en":{"defaultValue":"<div>Lisa Ruiz</div>","wwFormula":"variables['168d2818-ca6a-4a76-bd14-b5d4a821b6fc']?.['title']"}}}},"styles":{"default":{"margin":"2px 0","padding":"0px 0","color":"#18181B","fontSize":"24px","fontWeight":500,"letterSpacing":"0px","textDecoration":"none","textDecorationStyle":"solid"}}}
{"uid":20,"tag":"ww-text","props":{"default":{"tag":"p","bgColor":"","shadows":"","fontStyle":"ww-font-style-text","textColor":"","transformation":"","text":{"en":"<div>lisa.ruiz@kanban.com</div>"}}},"styles":{"default":{"margin":"2px 0","padding":"0px 0","color":"#71717A","fontSize":"16px","fontWeight":400,"letterSpacing":"0px","textDecoration":"none","textDecorationStyle":"solid"}}}
{"uid":21,"tag":"ww-flexbox","name":"container","styles":{"default":{"margin":"16px 0","flexWrap":true,"alignItems":"stretch","flexDirection":"row","justifyContent":"flex-start"}},"children":{"children":[{"uid":22}]},"props":{"repeat":{"children":{"wwFormula":"['Design', 'Product', 'Marketing','Management']"}}}}
{"uid":22,"tag":"ww-flexbox","styles":{"default":{"padding":"0px 4px 0px 0px","flexWrap":true,"alignItems":"stretch","flexDirection":"row","justifyContent":"center"}},"children":{"children":[{"uid":23}]}}
{"uid":23,"tag":"ww-text","props":{"default":{"tag":"p","bgColor":"","shadows":"","fontStyle":"ww-font-style-text","textColor":"","transformation":"","text":{"en":{"defaultValue":"<p>This is some text</p>","wwFormula":"context.item.data"}}}},"styles":{"default":{"padding":"2px 8px","borderRadius":"16px","backgroundColor":"#EEF4FF","color":"#1D4ED8","fontSize":"12px","letterSpacing":"0px","textDecoration":"none","textDecorationStyle":"solid"}}}
{"uid":24,"tag":"ww-text","props":{"default":{"tag":"p","bgColor":"","shadows":"","fontStyle":"ww-font-style-text","textColor":"","transformation":"","text":{"en":"<div>About</div>"}}},"styles":{"default":{"margin":"2px 0","padding":"0px 0","color":"#3F3F46","fontSize":"14px","fontWeight":500,"letterSpacing":"0px","textDecoration":"none","textDecorationStyle":"solid"}}}
{"uid":25,"tag":"ww-text","props":{"default":{"tag":"p","bgColor":"","shadows":"","fontStyle":"ww-font-style-text","textColor":"","transformation":"","text":{"en":"<div>Enim feugiat ut ipsum, neque ut. Tristique mi id elementum praesent. Gravida in tempus feugiat netus enim aliquet a, quam scelerisque. Dictumst in convallis nec in bibendum aenean arcu.&nbsp;</div>"}}},"styles":{"default":{"margin":"2px 0","padding":"0px 0","color":"#71717A","fontSize":"14px","fontWeight":400,"letterSpacing":"0px","textDecoration":"none","textDecorationStyle":"solid"}}}
</elements>
<elements_workflows>
{"elementUid":2,"workflowId":"c5e948b1-0b07-45c2-a0be-e9a0c8aa02a6","index":0,"id":"c5e948b1-0b07-45c2-a0be-e9a0c8aa02a6","name":"Show details","actions":{"351bcd2f-1b27-4b82-abea-2500b9c11b79":{"id":"351bcd2f-1b27-4b82-abea-2500b9c11b79","name":"Select item","next":"56beac15-4477-4d81-9c7c-206fa5bf23b1","type":"variable","varId":"168d2818-ca6a-4a76-bd14-b5d4a821b6fc","varValue":{"wwFormula":"context.item.data"}},"56beac15-4477-4d81-9c7c-206fa5bf23b1":{"id":"56beac15-4477-4d81-9c7c-206fa5bf23b1","name":"Show details","type":"variable","varId":"402df1b8-0a02-4cda-956d-a81585b01ddd","varValue":true}},"trigger":"click","firstAction":"351bcd2f-1b27-4b82-abea-2500b9c11b79"}
{"elementUid":10,"workflowId":"b12e9394-c497-4ef9-bfba-dfc919491c41","index":0,"id":"b12e9394-c497-4ef9-bfba-dfc919491c41","name":"Add card","actions":{"109f4218-e42a-43ec-9d42-8894c54f49ad":{"id":"109f4218-e42a-43ec-9d42-8894c54f49ad","name":"Update status","next":"7ebb781f-1d6b-47ff-ba2f-ea8d516f582d","path":"status","type":"variable","varId":"3c979442-b57d-4b7d-a907-25bb70bfbba5","usePath":true,"internal":false,"varValue":{"wwFormula":"context.item.data?.['value']"}},"33fa8bd7-a8a8-4413-92c6-bae76e32baff":{"id":"33fa8bd7-a8a8-4413-92c6-bae76e32baff","name":"Create new","next":"109f4218-e42a-43ec-9d42-8894c54f49ad","type":"variable","varId":"3c979442-b57d-4b7d-a907-25bb70bfbba5","internal":false,"varValue":{"id":0,"img":"https://picsum.photos/500","title":"New card","status":"todo","createdAt":"13th June"}},"7ebb781f-1d6b-47ff-ba2f-ea8d516f582d":{"id":"7ebb781f-1d6b-47ff-ba2f-ea8d516f582d","name":"Update status","next":"e015a447-438c-4f46-8ac6-40bd579f40a5","path":"id","type":"variable","varId":"3c979442-b57d-4b7d-a907-25bb70bfbba5","usePath":true,"internal":false,"varValue":{"wwFormula":"wwFormulas.getByIndex(variables['a92e4eea-5423-41fa-b584-9ca4412e7837'],wwFormulas.length(variables['a92e4eea-5423-41fa-b584-9ca4412e7837'])-1).id +1"}},"e015a447-438c-4f46-8ac6-40bd579f40a5":{"id":"e015a447-438c-4f46-8ac6-40bd579f40a5","name":"Add to Kanban","type":"variable","varId":"a92e4eea-5423-41fa-b584-9ca4412e7837","internal":false,"varValue":{"wwFormula":"wwFormulas.add(variables['a92e4eea-5423-41fa-b584-9ca4412e7837'],variables['3c979442-b57d-4b7d-a907-25bb70bfbba5'])"},"arrayUpdateType":""}},"trigger":"click","firstAction":"33fa8bd7-a8a8-4413-92c6-bae76e32baff"}
{"elementUid":16,"workflowId":"6b897100-7000-4b7b-8999-8eecd1bd52b5","index":0,"id":"6b897100-7000-4b7b-8999-8eecd1bd52b5","actions":{"624966d3-2c51-485a-b8dd-46043aa221ce":{"id":"624966d3-2c51-485a-b8dd-46043aa221ce","type":"variable","varId":"402df1b8-0a02-4cda-956d-a81585b01ddd","varValue":false}},"trigger":"click","firstAction":"624966d3-2c51-485a-b8dd-46043aa221ce"}
</elements_workflows>
