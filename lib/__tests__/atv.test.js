const ATVAuthenticator = require('../atvAuthenticator');

// note: Test suites Using test vectors in https://htmlpreview.github.io/?https://github.com/philippe44/RAOP-Player/blob/master/doc/auth_protocol.html.
describe('pair-setup', () => {
    const a     = 'a18b940d3e1302e932a64defccf560a0714b3fa2683bbe3cea808b3abfa58b7d';
    const a_pub = '0ceaa63dedd87d2da05ff0bdfbd99b5734911269c70664b9a74e04ae5cdbeca7';
    const K     = '9a689113a76b44583e73f9662eb172e830886ed988f04c6c0030f0e93c68784de27dbf30c5d151fb';

    test('computes a_pub', () => {
        expect(ATVAuthenticator.a_pub(a)).toBe(a_pub);
    });

    test('pair_setup_aes_key', () => {
        expect(ATVAuthenticator.pair_setup_aes_key(K)).toBe('a043357cee40a9ae0731dd50859cccfb');
    });

    test('pair_setup_aes_iv', () => {
        expect(ATVAuthenticator.pair_setup_aes_iv(K)).toBe('da36ea69a94d51d881086e9080dbaef8');
    });

    test('confirm', () => {
        expect(
            ATVAuthenticator.confirm(
                a,
                '9a689113a76b44583e73f9662eb172e830886ed988f04c6c0030f0e93c68784de27dbf30c5d151fb'
            )
        )
        .toEqual({ 
            epk: '5de0f61622b0d41bc098b07f229863f49e1a1c1030908b0ec620386e089a20c4', 
            authTag: '3b13d2e85f00555c6a05df5cb03a2105' 
        });
    });
})

describe('pair-verify', () => {
    const shared = 'b7085ca45bd640d966525cbdbc0745bd1d80aa6e6ee48270b60affba3cccac31';

    test('aes-key', () => {
        expect(ATVAuthenticator.pair_verify_aes_key(shared)).toBe('2556d9ef1780c8283eecf259fc7207af');
    });

    test('aes-iv', () => {
        expect(ATVAuthenticator.pair_verify_aes_iv(shared)).toBe('453404da307f780e6d50e52d7dc62325');
    });

    test('signature', () => {
        const key       = '2556d9ef1780c8283eecf259fc7207af';
        const iv        = '453404da307f780e6d50e52d7dc62325';
        const atv_data  = '3067a3ea868ade5c9fab43a8d5dc4d53ca1115dbf1c882888f877e85b65c3a82a61583f24c33bf0b9a6ec5c4ab2ecc555a939e7633557453854795e82f2d7ef6';
        const signed    = '82a0cf6cdba66df407fdeb51ac3884748e3a47c8de3f681d534299e707428ce19f6822d2bf925c5d197f1042e7c5b7160a764e42f9fbe33ce57b3704821cff0d';

        expect(
            ATVAuthenticator.signature(shared, atv_data, signed)
        ).toBe(
            '89dfefdc253147f32f5dc00e4a7042ebccdec663a422c80c1dd5ab69e9cc3304be2de1b0620cdef4749ccdffb4a8f4c4f704124e00f07b6efc3a722f173418a5'
        );
    })
})