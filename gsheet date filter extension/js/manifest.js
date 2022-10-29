let manifest =
{
    // Required
    "manifest_version": 3,
    "name": "My Extension",
    "version": "versionString",

    // Recommended
    "action": {
        "default_icon": {              // optional
            "16": "images/icon16.png",   // optional
            "24": "images/icon24.png",   // optional
            "32": "images/icon32.png"    // optional
        },
        "default_title": "Click Me",   // optional, shown in tooltip
        "default_popup": "popup.html"  // optional
    },
    "default_locale": "en",
    "description": "A plain text description",
    "icons": {
        "16": "icon16.png",
        "32": "icon32.png",
        "48": "icon48.png",
        "128": "icon128.png"
    },

    // Optional
    "author": "Abhishek",
    "automation": "",
    "background": {
        // Required
        "service_worker": "background.js",
        // Optional
        "type": "module"
    },
    "chrome_settings_overrides": {},
    "chrome_url_overrides": {},
    "commands": {},
    "content_capabilities": "",
    "content_scripts": [{}],
    "content_security_policy": {},
    "converted_from_user_script": "",
    "cross_origin_embedder_policy": { "value": "require-corp" },
    "cross_origin_opener_policy": { "value": "same-origin" },
    "current_locale": "",
    "declarative_net_request": "",
    "devtools_page": "devtools.html",
    "differential_fingerprint": "",
    "event_rules": [{}],
    "externally_connectable": {
        "matches": ["*://*.example.com/*"]
    },
    "file_browser_handlers": [],
    "file_system_provider_capabilities": {
        "configurable": true,
        "multiple_mounts": true,
        "source": "network"
    },
    "homepage_url": "https://path/to/homepage",
    "host_permissions": [],
    "import": [{ "id": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" }],
    "incognito": "spanning, split, or not_allowed",
    "input_components": "",
    "key": "publicKey",
    "minimum_chrome_version": "versionString",
    "nacl_modules": [],
    "natively_connectable": "",
    "oauth2": "",
    "offline_enabled": true,
    "omnibox": {
        "keyword": "aString"
    },
    "optional_host_permissions": [""],
    "optional_permissions": ["tabs"],
    "options_page": "options.html",
    "options_ui": {
        "page": "options.html"
    },
    "permissions": ["activeTab", "scripting"],
    "platforms": "",
    "replacement_web_app": "",
    "requirements": {},
    "sandbox": [],
    "short_name": "Short Name",
    "storage": {
        "managed_schema": "schema.json"
    },
    "system_indicator": "",
    "tts_engine": {},
    "update_url": "https://path/to/updateInfo.xml",
    "version_name": "aString",
    "web_accessible_resources": []
}