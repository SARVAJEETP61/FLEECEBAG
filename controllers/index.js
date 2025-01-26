$(document).ready(function () {
    // Initialize Owl Carousel for Featured Products
    if ($(".owl-1").length > 0) {
        $(".owl-1").owlCarousel({
            items: 1,
            loop: true,
            stagePadding: 0,
            mouseDrag: true,
            touchDrag: true,
            margin: 20,
            smartSpeed: 1300,
            autoplay: true,
            pauseOnHover: false,
            responsive: {
                600: {
                    margin: 20,
                    nav: true,
                    items: 2,
                },
                1000: {
                    margin: 20,
                    stagePadding: 0,
                    items: 4,
                },
            },
        });
    }
});
