// Nama laman SEO seragam: "Nama tarikan + Bandar + Panduan Pelancongan".
// Digunakan sebagai title laman utama, og:site_name, dan akhiran denganSiteName() pada sublaman.
export const SITE_NAME = 'Lapangan Terbang Antarabangsa Brunei Bandar Seri Begawan — Panduan Pelancongan';

export const withSiteName = (pageTitle: string): string => `${pageTitle} | ${SITE_NAME}`;

export const siteInfo = {
  name: 'Panduan Lapangan Terbang Antarabangsa Brunei',
  shortName: 'Panduan BWN',
  placeName: 'Lapangan Terbang Antarabangsa Brunei',
  code: 'BWN · WBSB',
  address: 'Lapangan Terbang Antarabangsa Brunei, Bandar Seri Begawan BB2513, Negara Brunei Darussalam',
  latitude: 4.9448545,
  longitude: 114.934508,
  mapLatitude: 4.9448545,
  mapLongitude: 114.934508,
  rating: 4.1,
  ratingCount: 1394,
  gaId: 'G-HXM22WWPKP',
  emailOfficial: 'info.dca@dca.gov.bn',
  phoneOfficial: '+673 2330142'
} as const;

export const officialSources = [
 {label:'DCA — status ketibaan dan berlepas',href:'https://www.dca.gov.bn/flight-information/'},
 {label:'DCA — hubungan dan maklumat lapangan terbang',href:'https://www.dca.gov.bn/'},
 {label:'DCA — sejarah penerbangan Brunei',href:'https://www.dca.gov.bn/introduction/'}
] as const;
