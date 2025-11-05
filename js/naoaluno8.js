const formulary = document.getElementById('black-november-lp8-2025');
formulary.addEventListener('submit', function (e) {
    e.preventDefault();

    const inputWeb = document.querySelector('.input-web').value;
    const inputName = document.querySelector('.input-name').value;
    const inputEmail = document.querySelector('.input-email').value;
    const inputPhone = document.querySelector('.input-phone').value;

    if (formulary.checkValidity()) {
        formSubmit(inputWeb, inputName, inputEmail, inputPhone);
    }
});

const applyBrPhoneMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    if (!value.startsWith("55")) {
        value = "55" + value;
    }
    let local = value.slice(2);
    if (local.length > 0) {
        local = local.replace(/^(\d{2})(\d)/, "($1) $2");
        local = local.replace(/(\d{4})(\d{4})$/, "$1.$2");
    }

    return `+${value.slice(0, 2)} ${local}`;
};

const applyUSPhoneMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    if (!value.startsWith("1")) {
        value = "1" + value;
    }
    let local = value.slice(1);
    if (local.length <= 1) {
        local = `${local}`;
    } else if (local.length <= 3) {
        local = `(${local}`;
    } else if (local.length <= 6) {
        local = `(${local.slice(0, 3)}) ${local.slice(3)}`;
    } else {
        local = `(${local.slice(0, 3)}) ${local.slice(3, 6)}.${local.slice(6, 10)}`;
    }

    return `+${value.slice(0, 1)} ${local}`;
};

const applyPTPhoneMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    if (!value.startsWith("351")) {
        value = "351" + value;
    }
    let local = value.slice(3);
    if (local.length <= 3) {
        local = `${local}`;
    } else if (local.length <= 6) {
        local = `${local.slice(0, 3)} ${local.slice(3)}`;
    } else {
        local = `${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6, 9)}`;
    }
    return `+351 ${local}`;
};

const applyCanadianPhoneMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    if (!value.startsWith("1")) {
        value = "1" + value;
    }
    let local = value.slice(1);
    if (local.length <= 1) {
        local = `${local}`;
    } else if (local.length <= 3) {
        local = `(${local}`;
    } else if (local.length <= 6) {
        local = `(${local.slice(0, 3)}) ${local.slice(3)}`;
    } else {
        local = `(${local.slice(0, 3)}) ${local.slice(3, 6)}.${local.slice(6, 10)}`;
    }
    return `+${value.slice(0, 1)} ${local}`;
};

const applyUnitedKingdomPhoneMask = (value) => {
    if (!value) return "";
    let digits = value.replace(/\D/g, "");
    if (!digits.startsWith("44")) digits = "44" + digits;
    let local = digits.slice(2);
    if (local.startsWith("0")) local = local.slice(1);
    local = local.slice(0, 10);
    if (local.length <= 4) {
        local = local;
    } else {
        local = `${local.slice(0, 4)} ${local.slice(4)}`;
    }

    return `+44 ${local}`;

};

const applyIrelandPhoneMask = (value) => {
    if (!value) return "";
    const digits = value.replace(/\D/g, "");
    let v = digits;
    if (v.startsWith("353")) v = v.slice(3);
    if (v.startsWith("0")) v = v.slice(1);
    v = v.slice(0, 9);
    if (v.length <= 2) return `+353 ${v}`;
    if (v.length <= 5) return `+353 ${v.slice(0, 2)} ${v.slice(2)}`;
    if (v.length <= 9) return `+353 ${v.slice(0, 2)} ${v.slice(2, 5)} ${v.slice(5)}`;
    return `+353 ${v}`;
};

const definePhoneMask = () => {
    const inputSelect = document.querySelector('.input-select');
    const countryImage = document.querySelector('.form-box-phonemask img');
    const inputPhone = document.querySelector('.input-phone');

    inputPhone.removeEventListener('input', handleBrazilMask);
    inputPhone.removeEventListener('input', handleEUAMask);
    inputPhone.removeEventListener('input', handlePortugalMask);
    inputPhone.removeEventListener('input', handleCanadaMask);
    inputPhone.removeEventListener('input', handleUnitedKingdomMask);
    inputPhone.removeEventListener('input', handleIrelandMask);

    if (inputSelect.value === "brazil") {
        inputPhone.maxLength = 19;
        inputPhone.placeholder = "Seu WhatsApp (opcional): +55 (55) 12345.6789";
        countryImage.src = "/assets/blacknovember_page/images/brazil_flag.svg";
        countryImage.alt = "Máscara brasileira";
        inputPhone.addEventListener('input', handleBrazilMask);
        inputPhone.value = "+55 "
    }

    if (inputSelect.value === "eua") {
        inputPhone.maxLength = 17;
        inputPhone.placeholder = "Seu WhatsApp (opcional): +1 (555) 123.4567";
        countryImage.src = "/assets/blacknovember_page/images/eua_flag.svg";
        countryImage.alt = "Máscara eua";
        inputPhone.addEventListener('input', handleEUAMask);
        inputPhone.value = "+1 "
    }

    if (inputSelect.value === "portugal") {
        inputPhone.maxLength = 22;
        inputPhone.placeholder = "Seu WhatsApp (opcional): +351 123.456.789";
        countryImage.src = "/assets/blacknovember_page/images/portugal_flag.svg";
        countryImage.alt = "Máscara portugal";
        inputPhone.addEventListener('input', handlePortugalMask);
        inputPhone.value = "+351 "
    }

    if (inputSelect.value === "ireland") {
        inputPhone.maxLength = 19;
        inputPhone.placeholder = "Seu WhatsApp (opcional): +353 12 345 6789";
        countryImage.src = "/assets/blacknovember_page/images/ireland_flag.png";
        countryImage.alt = "Máscara irlanda";
        inputPhone.addEventListener('input', handleIrelandMask);
        inputPhone.value = "+353 "
    }

    if (inputSelect.value === "canada") {
        inputPhone.maxLength = 16;
        inputPhone.placeholder = "Seu WhatsApp (opcional): +1 (555) 123.4567";
        countryImage.src = "/assets/blacknovember_page/images/canada_flag.png";
        countryImage.alt = "Máscara canadense";
        inputPhone.addEventListener('input', handleCanadaMask);
        inputPhone.value = "+1 "
    }

    if (inputSelect.value === "unitedKingdom") {
        inputPhone.maxLength = 16;
        inputPhone.placeholder = "Seu WhatsApp (opcional): +44 1234 567890";
        countryImage.src = "/assets/blacknovember_page/images/unitedKingdom_flag.png";
        countryImage.alt = "Máscara do Reino Unido";
        inputPhone.addEventListener('input', handleUnitedKingdomMask);
        inputPhone.value = "+44 "
    }

    if (inputSelect.value === "other") {
        inputPhone.maxLength = 17;
        inputPhone.placeholder = "Seu WhatsApp (opcional)";
        countryImage.src = "/assets/blacknovember_page/images/world_flag.svg";
        countryImage.alt = "Sem máscara";
    }
};

const handleBrazilMask = (e) => {
    e.target.value = applyBrPhoneMask(e.target.value);
};

const handleEUAMask = (e) => {
    e.target.value = applyUSPhoneMask(e.target.value);
};

const handlePortugalMask = (e) => {
    e.target.value = applyPTPhoneMask(e.target.value);
};

const handleIrelandMask = (e) => {
    e.target.value = applyIrelandPhoneMask(e.target.value);
};

const handleCanadaMask = (e) => {
    e.target.value = applyCanadianPhoneMask(e.target.value);
};

const handleUnitedKingdomMask = (e) => {
    e.target.value = applyUnitedKingdomPhoneMask(e.target.value);
};

document.addEventListener('DOMContentLoaded', () => {
    const inputSelect = document.querySelector('.input-select');
    inputSelect.value = "brazil";
    definePhoneMask();
});

const optionsArray = document.querySelectorAll('.dropdown-item');
optionsArray.forEach(option => {
    const inputPhone = document.querySelector('.input-phone');
    const inputSelect = document.querySelector('.input-select');

    option.addEventListener('click', (e) => {
        inputPhone.value = "";
        const target = e.currentTarget;
        const value = target.getAttribute('value');

        if (value == "brazil") {
            inputSelect.value = "brazil";
            definePhoneMask();
        }
        if (value == "eua") {
            inputSelect.value = "eua";
            definePhoneMask();
        }
        if (value == "portugal") {
            inputSelect.value = "portugal";
            definePhoneMask();
        }
        if (value == "canada") {
            inputSelect.value = "canada";
            definePhoneMask();
        }
        if (value == "unitedKingdom") {
            inputSelect.value = "unitedKingdom";
            definePhoneMask();
        }
        if (value == "ireland") {
            inputSelect.value = "ireland";
            definePhoneMask();
        }
        if (value == "other") {
            inputSelect.value = "other";
            definePhoneMask();
        }
    });
});

const formSubmit = async (web, name, email, phone) => {
    try {
        openLoadingModal();
        const { urlObjParamsWithSearch, urlObjParams } = definesParamsURL(email, name, phone);

        let response = await fetch(
            "https://www.profkenny.com.br/api/kenny_master_class/register_form",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    website_id: web,
                    name: name,
                    email: email,
                    telefone: phone
                }),
            },
        );

        /* let responseCapture = await fetch(
            "https://n8n.digienge.ai/webhook/captacao-nao-alunos-knny-bf10x",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    urlObjParams
                })
            }
        ); */

        closeLoadingModal();
        if (!response.ok) {
            const result = await response.json();
            openErrorModal(result);
            return;
        }
        /* if (!responseCapture.ok) {
            const resultCapture = await responseCapture.json();
            openErrorModal(resultCapture);
            return;
        } */

        window.location.href = "https://go.invictuspay.app.br/nexfcsswng";
    } catch (error) {
        console.log(error);
    }
};

const definesParamsURL = (email, name, phone) => {
    let urlObjParamsWithSearch = new URLSearchParams({
        email: email,
        name: name,
        tel: phone,
    });

    let urlObjParams = {
        email: email,
        name: name,
        tel: phone,
    }

    let xcod = new URLSearchParams(window.location.search).get('xcod');
    if (xcod) {
        urlObjParamsWithSearch.append('xcod', xcod);
        urlObjParams.xcod = xcod;
    }

    let setUTMParams = getUTMParams();
    for (const [key, value] of Object.entries(setUTMParams)) {
        if (value) {
            urlObjParamsWithSearch.append(key, value);
            urlObjParams[key] = value;
        }
    }

    return { urlObjParamsWithSearch, urlObjParams };
}

const getUTMParams = () => {
    const params = new URLSearchParams(window.location.search);

    const UTMParams = {
        utmSource: params.get('utm_source'),
        utmMedium: params.get('utm_medium'),
        utmCampaign: params.get('utm_campaign'),
        sck: params.get('sck'),
        utmContent: params.get('utm_content'),
        utmTerm: params.get('utm_term'),
        vk_source: params.get('vk_source'),
        vk_ad_id: params.get('vk_ad_id')
    };

    const hasParams = {};

    for (let [key, value] of Object.entries(UTMParams)) {
        if (value !== null && value !== '') {
            hasParams[key] = value;
        }
    }

    return hasParams;
};

openLoadingModal = () => {
    const modal = document.getElementById("loading-modal-container");
    modal.style.display = "flex";
    modal.style.visibility = "visible";
    setTimeout(() => {
        modal.style.opacity = "1";
    }, 200);
};

closeLoadingModal = () => {
    const modal = document.getElementById("loading-modal-container");
    modal.style.opacity = "0";
    setTimeout(() => {
        modal.style.visibility = "hidden";
        modal.style.display = "none";
    }, 500);
};

openErrorModal = error => {
    const modal = document.getElementById("error-modal-container");
    modal.style.display = "flex";
    modal.style.visibility = "visible";

    if (error && error.message) {
        const errorModalDescription = document.getElementsByClassName(
            "error-modal-description",
        );
        errorModalDescription[0].innerHTML = error.message;
    }
    setTimeout(() => {
        modal.style.opacity = "1";
    }, 200);
};

closeErrorModal = () => {
    const modal = document.getElementById("error-modal-container");
    modal.style.opacity = "0";
    setTimeout(() => {
        modal.style.visibility = "hidden";
        modal.style.display = "none";
    }, 500);
};
const btnCloseErrorModal = document.getElementsByClassName(
    "btn-close-error-modal",
);
btnCloseErrorModal[0].addEventListener("click", closeErrorModal);
