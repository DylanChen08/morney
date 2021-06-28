const presets = {
    autoScroll() {
        return window.onload = function () {
            setTimeout(function () {
                window.scrollTo(0, 1000);
            }, 0);
        };
    }
}
export default presets;