/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_WS_URL: string;
    readonly VITE_GQL_URL: string;
    readonly VITE_BUILD_RESUME_URL: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
