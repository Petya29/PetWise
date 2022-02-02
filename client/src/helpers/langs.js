export const formatLangTitle = (lang) => {
    let formattedLang = "";

    switch (lang) {
        case "en":
            formattedLang = "English";
            break;
        case "pl":
            formattedLang = "Polish";
            break;
        case "ru":
            formattedLang = "Russian";
            break;
        default:
            break;
    }

    return formattedLang;
}