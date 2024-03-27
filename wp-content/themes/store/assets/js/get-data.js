try{
    var salePopupData = {
        o: [],
        u: [],
        a: [],
    };
    salePopupData.o.push("nhan-ban-tu-ao-thun-telly-shit-1");

    salePopupData.o.push("nhan-ban-tu-ao-thun-elix");

    salePopupData.u.push("Bích Thủy ở Quảng Bình");

    salePopupData.u.push("Quang Hải ở Nghệ An");

    salePopupData.u.push("Thu Quỳnh ở Hà Nội");

    salePopupData.u.push("Trọng Nghĩa ở Ninh Thuận");

    salePopupData.u.push("Văn Trọng ở TP.Hồ Chí Minh");


    salePopupData.a.push("Cách đây 30 phút");

    salePopupData.a.push("5 phút trước");

    salePopupData.a.push("7 phút trước");

    salePopupData.a.push("15 phút trước");

    salePopupData.a.push("1 ngày trước");

}catch(e){}
window.F1GEN_vars = {
    template: "index",
    formatMoney: '',
    account: {
        logged: false,
        id: null,
        email: null
    },
    product: {
        data: null,
        id: null,
        handle: null,
        title: "",
        gift: false,
        availableOption: true
    },
    quickView: null,
    collection: {
        paginate: {
            current: 1,
            value: ""
        },
        data: {
            id: "",
            title: "",
            vendors: "",
            types: "",
            sortBy: ""
        },
        filter: {
            config:{
                price: {
                    min: "0",
                    max: "20000000",
                    step: "5000"
                }
            },
            data: {
                vendors: null,
                types: null,
                sortBy: null,
                prices: null,
                tags: null,
                variants: {
                    option1:null,
                    option2:null,
                    option3:null,
                }
            }
        }
    },
    salePopup: {
        active: false,
        type: "manual",
        orders: salePopupData.o,
        customers: salePopupData.u,
        time: {
            ago: salePopupData.a,
            delayBetween: "7000",
            delayPopup: "5000",
        },
        count: "20",
    }
}