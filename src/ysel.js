const prefix = "ysel";

const selectors = {
    header: prefix + "-header",
    property: prefix + "-property",
    item: prefix + "-item",
    name: prefix + '-name',
    default: prefix + '-default'
}

const selects = document.querySelectorAll("[" + selectors.name + "]");

selects.forEach(select => {
    const header = select.querySelector("[" + selectors.header + "]");
    const properties = header.querySelectorAll("[" + selectors.property + "]");

    const items = select.querySelectorAll("[" + selectors.item + "]");

    const name = select.getAttribute(selectors.name);
    const defaultValue = select.getAttribute(selectors.default);

    let input = null;

    select.addEventListener('click', ()=> {
        select.classList.toggle('active');
    });

    items.forEach(item => {
        const itemInfo = {
            id: item.getAttribute(prefix + '-item'),
            properties: item.querySelectorAll("[" + selectors.property + "]")
        };

        if(defaultValue != null && itemInfo.id == defaultValue) {
            setItem(itemInfo);
        }

        item.addEventListener('click', () => {
            setItem(itemInfo);
        });
    });

    function setItem(info) {
        if(input == null) {
            const element = document.createElement('input');
            element.setAttribute('name', name)
            element.setAttribute('id', name);
            element.setAttribute('hidden', '');

            select.after(element);

            input = element;
        }

        info.properties.forEach(property => {
            const name = property.getAttribute(selectors.property);

            properties.forEach(selectPropertyItem => {
                const selectName = selectPropertyItem.getAttribute(selectors.property);

                if(name == selectName) {
                    selectPropertyItem.textContent = property.textContent;
                }
            });
        });
    }
});