/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/did_registry.json`.
 */
export type DidRegistry = {
  "address": "6HU4LvWmDGQaZhhyE4ThME19UYTLWxmWrqZC1LdzMyoz",
  "metadata": {
    "name": "didRegistry",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "registerDid",
      "discriminator": [
        83,
        145,
        243,
        215,
        189,
        3,
        25,
        225
      ],
      "accounts": [
        {
          "name": "didEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  105,
                  100,
                  95,
                  101,
                  110,
                  116,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "did",
          "type": "string"
        },
        {
          "name": "didDocument",
          "type": "string"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateDidDocument",
      "discriminator": [
        64,
        216,
        17,
        91,
        205,
        94,
        45,
        57
      ],
      "accounts": [
        {
          "name": "didEntry",
          "writable": true
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "didEntry"
          ]
        }
      ],
      "args": [
        {
          "name": "didDocument",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "didEntry",
      "discriminator": [
        97,
        3,
        248,
        216,
        117,
        74,
        83,
        126
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "unauthorized",
      "msg": "You are not authorized to perform this action."
    }
  ],
  "types": [
    {
      "name": "didEntry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "did",
            "type": "string"
          },
          {
            "name": "didDocument",
            "type": "string"
          }
        ]
      }
    }
  ]
};
