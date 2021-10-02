import ExpandableCheckboxList from './ExpandableCheckboxList';

const lists = document.querySelectorAll('.js-expandable-checkbox-list');

lists.forEach((listDom) => new ExpandableCheckboxList(listDom));
