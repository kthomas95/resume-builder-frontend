import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: {
        "http://localhost:8090/graphql": {
            headers: {},
        },
    },
    documents: ["src/**/*.graphql"],
    generates: {
        // "src/__generated__/graphql-types.ts": {
        //     plugins: ["typescript"],
        //     config: {
        //         declarationKind: "interface",
        //         flattenGeneratedTypes: false,
        //         skipTypename: true,
        //         defaultScalarType: "unknown",
        //         useImplementingTypes: true,
        //         scalars: {
        //             UUID: "string",
        //         },
        //     },
        // },
        // "./src/gql/": {
        //     preset: "client",
        // },
        "src/__generated__/graphql.ts": {
            // preset: "near-operation-file",
            presetConfig: {
                //     folder: "__generated__",
                //     extension: ".generated.ts",
                //     // flattenGeneratedTypesIncludingFragments: true,
                //     fragmentMasking: false,
                //     exportFragmentSpreadSubTypes: true,
                declarationKind: "interface",
                //     baseTypesPath: "graphql/graphql-types.ts",
            },
            config: {
                withHooks: true,
                skipTypename: true,
                inlineFragmentTypes: "combine",
                // flattenGeneratedTypes: true,
                // flattenGeneratedTypesIncludingFragments: true,
                useImplementingTypes: true,
                // useImplimentingTypes: true,
                defaultScalarType: "unknown",
                exportFragmentSpreadSubTypes: true,
                declarationKind: "interface",
                scalars: {
                    UUID: "string",
                },
            },
            plugins: ["typescript-urql", "typescript-operations", "typescript"],
        },
    },
};

export default config;
