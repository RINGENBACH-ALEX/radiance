
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header")
    const menuBtn = document.querySelector(".header__menu-btn")
    const menu = document.querySelector(".menu")
    const menuClose = document.querySelector(".menu__close")
    const path = window.location.pathname

    /* ---------- Menu ---------- */
    const openMenu = () => {
        menu.classList.add("menu--open")
        document.body.classList.add("is-menu-open")
        document.body.style.overflow = "hidden"
        menuBtn.setAttribute("aria-expanded", "true")
        if (menuClose) menuClose.focus()
    }

    const closeMenu = () => {
        menu.classList.remove("menu--open")
        document.body.classList.remove("is-menu-open")
        document.body.style.overflow = ""
        menuBtn.setAttribute("aria-expanded", "false")
        menuBtn.focus()
    }

    if (menuBtn && menu) {
        menuBtn.setAttribute("aria-expanded", "false")
        menuBtn.addEventListener("click", openMenu)

        if (menuClose) {
            menuClose.addEventListener("click", closeMenu)
        }

        // fermeture avec Échap
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && menu.classList.contains("menu--open")) {
                closeMenu()
            }
        })

        // fermeture en cliquant sur le fond assombri
        document.addEventListener("click", (event) => {
            if (!menu.classList.contains("menu--open")) return
            if (menu.contains(event.target) || menuBtn.contains(event.target)) return
            closeMenu()
        })

        // page courante dans le menu
        menu.querySelectorAll(".menu__link").forEach((link) => {
            if (link.pathname === path) {
                link.classList.add("menu__link--active")
                link.setAttribute("aria-current", "page")
            }
        })
    }

    /* ---------- Navigation desktop ---------- */
    document.querySelectorAll(".header__nav-link[href], .header__dropdown-link").forEach((link) => {
        if (link.pathname === path) {
            link.classList.add("is-active")
            link.setAttribute("aria-current", "page")
        }
    })

    document.querySelectorAll(".header__nav-item--dropdown").forEach((item) => {
        const toggle = item.querySelector(".header__nav-toggle")

        // l'onglet "Articles" est actif quand on lit un article
        if (item.querySelector(".header__dropdown-link.is-active")) {
            toggle.classList.add("is-active")
        }

        const setOpen = (open) => {
            item.classList.toggle("is-open", open)
            toggle.setAttribute("aria-expanded", String(open))
        }

        // clic : utile au clavier et sur les écrans tactiles (pas de survol)
        toggle.addEventListener("click", () => setOpen(!item.classList.contains("is-open")))

        document.addEventListener("click", (event) => {
            if (!item.contains(event.target)) setOpen(false)
        })

        item.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                setOpen(false)
                toggle.focus()
            }
        })
    })

    /* ---------- Langue active ---------- */
    document.querySelectorAll(".header__lang a").forEach((link) => {
        const lang = link.pathname.split("/")[1]
        if (path.startsWith("/" + lang + "/")) {
            link.classList.add("is-active")
            link.setAttribute("aria-current", "true")
        }
    })

    /* ---------- Ombre du header au scroll ---------- */
    if (header) {
        const onScroll = () => header.classList.toggle("header--scrolled", window.scrollY > 10)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
    }
})
