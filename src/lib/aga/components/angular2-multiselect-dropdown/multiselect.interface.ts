export interface DropdownSettings {
    singleSelection: Boolean;
    text: String;
    text_allselected?: string; // if this is set, when all options selected, this text will be displayed
    enableCheckAll: Boolean;
    selectAllText: String;
    unSelectAllText: String;
    enableSearchFilter: Boolean;
    maxHeight: Number;
    badgeShowLimit: Number;
    classes: String;
    limitSelection?: Number;
    badgeShow?: boolean;
    noglyph?: boolean;
}
