(() => {
    // style change detection
    var observer = new MutationObserver(function (mutations) {
        console.log('style changed!', mutations.target);
    });

    var target = filter_menu;
    observer.observe(target, { attributes: true, attributeFilter: ['style'] });
})();

// v1
(() => {
    // style change detection
    var observer = new MutationObserver(function (mutations) {
        // let e = mutations.target
        console.log(mutations);
    });

    var target = document.querySelector("body > div.goog-menu.goog-menu-vertical.waffle-filterbox-container.docs-material");
    observer.observe(target, { attributes: true, attributeFilter: ['style'] });
})();