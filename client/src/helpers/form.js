export const showErrors = (errors) => {
    const field = document.getElementById(errors.param);
    field.classList.add('invalid');
    const dangerText = document.querySelector(`.danger-${errors.param}`);
    dangerText.innerHTML = errors.msg;
    dangerText.classList.remove('hide');
}

export const hideErrors = () => {
    const fields = document.querySelectorAll('.validate');
    fields.forEach((el, index) => {
        el.classList.remove('invalid');
    });
    const elems = document.querySelectorAll('.danger-text');
    elems.forEach((el, index) => {
        el.classList.add('hide');
    });
}