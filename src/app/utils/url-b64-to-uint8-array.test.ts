import { urlB64ToUint8Array } from './url-b64-to-uint8-array';

describe('Util - urlB64ToUint8Array', () => {
  it('Function should return value', () => {
    const result = urlB64ToUint8Array(
      'BIqy1At_c_HUfsr5KV6tliLhTFwCoicAmB9kV93NXUqokDFiF59rqeZBs6mH9AwpqQFycLxnZGDVbfQmwJWPeHw'
    );
    expect(result.toString()).toEqual(
      [
        4, 138, 178, 212, 11, 127, 115, 241, 212, 126, 202, 249, 41, 94, 173, 150, 34, 225, 76, 92, 2, 162, 39, 0, 152,
        31, 100, 87, 221, 205, 93, 74, 168, 144, 49, 98, 23, 159, 107, 169, 230, 65, 179, 169, 135, 244, 12, 41, 169, 1,
        114, 112, 188, 103, 100, 96, 213, 109, 244, 38, 192, 149, 143, 120, 124,
      ].toString()
    );
  });
});
