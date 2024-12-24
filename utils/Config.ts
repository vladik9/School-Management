interface ConfigType {
  apiUrl: string;
  momentUSDateFormat: string;
  momentEUDateFormat: string;
  datePickerFormat: string;
  rowsPerPage: number[];
}

const Config: ConfigType = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '',
  momentUSDateFormat: 'YYYY-MM-DD',
  momentEUDateFormat: 'DD-MM-YYYY',
  datePickerFormat: 'YYYY-MM-DD HH:mm:ss',
  rowsPerPage: [10, 20, 50, 100],
};

export default Config;
