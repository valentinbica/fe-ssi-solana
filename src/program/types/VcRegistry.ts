/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/vc_registry.json`.
 */
export type VcRegistry = {
  address: '2qh7d42ADemB3UnaYTUMfBJ7dPu97Jwt8XhC5PrQnCGc';
  metadata: {
    name: 'vcRegistry';
    version: '0.1.0';
    spec: '0.1.0';
    description: 'Created with Anchor';
  };
  instructions: [
    {
      name: 'storeVerifiableCredential';
      discriminator: [203, 225, 39, 224, 148, 72, 103, 92];
      accounts: [
        {
          name: 'vcEntry';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [118, 99, 95, 101, 110, 116, 114, 121];
              },
              {
                kind: 'arg';
                path: 'did';
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
          name: 'vc';
          type: 'string';
        },
        {
          name: 'bump';
          type: 'u8';
        },
      ];
    },
  ];
  accounts: [
    {
      name: 'verifiableCredentialEntry';
      discriminator: [159, 151, 212, 43, 87, 15, 70, 210];
    },
  ];
  events: [
    {
      name: 'credentialStored';
      discriminator: [114, 139, 67, 160, 103, 239, 243, 95];
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
      name: 'credentialStored';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'did';
            type: 'string';
          },
          {
            name: 'vc';
            type: 'string';
          },
        ];
      };
    },
    {
      name: 'verifiableCredentialEntry';
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
            name: 'vc';
            type: 'string';
          },
        ];
      };
    },
  ];
};
