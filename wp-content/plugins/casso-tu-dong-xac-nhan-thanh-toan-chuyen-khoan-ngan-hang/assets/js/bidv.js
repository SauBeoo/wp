!function () {
    "use strict";
    var t = window.wp.element, e = window.wp.htmlEntities, a = window.wp.i18n, n = window.wc.wcBlocksRegistry, i = window.wc.wcSettings;
    const l = () => {
        const t = (0, i.getSetting)("casso_up_bidv_data", null); if (!t) throw new Error("BIDV initialization data is not available");
        return t
    };
    var o;
    const title = () => (0, e.decodeEntities)(l()?.title || "");
    const descriptionBeforeBankName = () => (0, e.decodeEntities)(l()?.description_before_bank_name || "");
    const descriptionAfterBankName = () => (0, e.decodeEntities)(l()?.description_after_bank_name || "");
    const powerBy = () => (0, e.decodeEntities)(l()?.power_by || "");
    const bankName = l().bank_name || "";
    const name = l()?.name || "";
    (0, n.registerPaymentMethod)
        ({
            name,
            label: (0, t.createElement)('div', {},
                (0, t.createElement)(title, null),
                (0, t.createElement)("img", { src: l()?.logo_url, alt: l()?.title, style: { marginLeft: "10px" } })
            ),
            ariaLabel: (0, a.__)("Casso", "woocommerce-gateway-casso"), canMakePayment: () => !0,
            content: (0, t.createElement)('div', {},
                (0, t.createElement)(descriptionBeforeBankName, null),
                (0, t.createElement)('b', {}, bankName),
                (0, t.createElement)(descriptionAfterBankName, null),
                (0, t.createElement)('div', { class: "power_by", style: { marginTop: "10px"} }, 
                    (0, t.createElement)(powerBy, null)
                )
            ),
            edit: (0, t.createElement)('div', {},
                (0, t.createElement)(descriptionBeforeBankName, null),
                (0, t.createElement)('b', {}, bankName),
                (0, t.createElement)(descriptionAfterBankName, null),
                (0, t.createElement)('div', { class: "power_by", style: { marginTop: "10px"} }, 
                    (0, t.createElement)(powerBy, null)
                )
            ),
            supports: { features: null !== (o = l()?.supports) && void 0 !== o ? o : [] }
        })
}();