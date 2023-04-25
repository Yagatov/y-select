const prefix = "yagatov"; // чтобы выебываться

const selects = document.querySelectorAll(prefix);

selects.forEach(select => {
    const header = select.querySelector("[" + prefix + "-header]");
    const value = header.querySelector("[" + prefix + "-value]");
    const properties = header.querySelectorAll("[" + prefix + "-property]");  // это потом

    const box = select.querySelector("[" + prefix + "-box]");
    const items = select.querySelectorAll("[" + prefix + "-item]");

    const name = select.getAttribute(prefix + '-name');
    const defaultValue = select.getAttribute(prefix + '-default'); // default null

    let input = null;

    select.addEventListener('click', ()=> {
        select.classList.toggle('active');
    });

    if(defaultValue == null) {
        value.textContent = "Выберите значение"
    }

    items.forEach(item => {
        const itemInfo = {
            id: item.getAttribute(prefix + '-item'),
            value: item.querySelector("[" + prefix + '-value]'),
            properties: item.querySelectorAll("[" + prefix + "-property]") // это тоже потом
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

        value.textContent = info.value.textContent;
        input.setAttribute('value', info.id);

        info.properties.forEach(property => {
            const name = property.getAttribute(prefix + "-property");

            properties.forEach(selectPropertyItem => {
                const selectName = selectPropertyItem.getAttribute(prefix + "-property");

                if(name == selectName) {
                    selectPropertyItem.textContent = property.textContent;
                }
            });
        });
    }
});