'use strict'
const available_themes = ['light', 'dark']
const Theme = {
    set: (themeID) => {
        themeID = themeID.toLowerCase()

        if (!available_themes.includes(themeID)) {
            console.error('Invalid ThemeID. dark & light themes only available')
            return
        }

        document.querySelector('#theme_css').href = './css/theme/' + themeID + '.css'

        return true
    },
    get: () => {
        let css_theme_file = (document.querySelector('#theme_css').href).split('/').pop()
        return css_theme_file.split('.')[0]
    },
    init: () => Theme.set(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
}

export default Theme















