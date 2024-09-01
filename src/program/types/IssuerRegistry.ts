/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/issuer_registry.json`.
 */
export type IssuerRegistry = {
  address: 'J31qcCrD5wyFTKyRhD7z3FTfWq24NZ1AMUWnn7g9GDBx';
  metadata: {
    name: 'issuerRegistry';
    version: '0.1.0';
    spec: '0.1.0';
    description: 'Created with Anchor';
  };
  instructions: [
    {
      name: 'registerIssuer';
      discriminator: [145, 117, 52, 59, 189, 27, 127, 18];
      accounts: [
        {
          name: 'issuer';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [105, 115, 115, 117, 101, 114];
              },
              {
                kind: 'account';
                path: 'owner';
              },
            ];
          };
        },
        {
          name: 'owner';
          writable: true;
          signer: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        },
      ];
      args: [
        {
          name: 'did';
          type: 'string';
        },
        {
          name: 'issuerData';
          type: 'string';
        },
      ];
    },
    {
      name: 'updateIssuerData';
      discriminator: [174, 114, 163, 65, 40, 160, 169, 25];
      accounts: [
        {
          name: 'issuer';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [105, 115, 115, 117, 101, 114];
              },
              {
                kind: 'account';
                path: 'owner';
              },
            ];
          };
        },
        {
          name: 'owner';
          signer: true;
          relations: ['issuer'];
        },
      ];
      args: [
        {
          name: 'newIssuerData';
          type: 'string';
        },
      ];
    },
  ];
  accounts: [
    {
      name: 'issuer';
      discriminator: [216, 19, 83, 230, 108, 53, 80, 14];
    },
  ];
  errors: [
    {
      code: 6000;
      name: 'unauthorized';
      msg: 'You are not authorized to perform this action.';
    },
  ];
  types: [
    {
      name: 'issuer';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'owner';
            type: 'pubkey';
          },
          {
            name: 'did';
            type: 'string';
          },
          {
            name: 'issuerData';
            type: 'string';
          },
        ];
      };
    },
  ];
};
