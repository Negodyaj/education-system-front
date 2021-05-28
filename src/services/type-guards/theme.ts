import { Themes } from '../../interfaces/Themes';

export const isTheme = (data: any): data is Themes => !!data.name;
