export default class Add {
  constructor(containerElement) {
    this._containerElement = containerElement;
    this._formElement = containerElement.querySelector('form');
    this._labelElement = this._formElement.querySelector('.add__file-chooser');
    this._fileElement = this._formElement.querySelector('[type="file"]');
    this._filtersELement = this._formElement.querySelector('.add__filters');
    this._filterTogglerElements = this._formElement.querySelectorAll('.add__filter-toggler');
    this._cropElement = this._formElement.querySelector('[name="crop"]');
    this._pinkElement = this._formElement.querySelector('[name="pink"]');
    this._contrastElement = this._formElement.querySelector('[name="contrast"]');
    this._resetELement = this._formElement.querySelector('[type="reset"]');

    this._defaultBg = this._labelElement.style.backgroundImage;

    this._setListeners();
  }

  _setListeners() {
    this._clickHandler = this._clickHandler.bind(this);
    this._changeFileHandler = this._changeFileHandler.bind(this);
    this._inputCropHandler = this._inputCropHandler.bind(this);
    this._inputPinkHandler = this._inputPinkHandler.bind(this);
    this._inputContrastHandler = this._inputContrastHandler.bind(this);
    this._resetHandler = this._resetHandler.bind(this);

    this._fileElement.addEventListener('change', this._changeFileHandler);
    this._cropElement.addEventListener('input', this._inputCropHandler);
    this._pinkElement.addEventListener('input', this._inputPinkHandler);
    this._contrastElement.addEventListener('input', this._inputContrastHandler);
    this._filtersELement.addEventListener('click', this._clickHandler);
    this._formElement.addEventListener('reset', this._resetHandler);
  }

  _changeFileHandler() {
    const [file] = this._fileElement.files;
    this._clearFilters(`url(${URL.createObjectURL(file)})`);
  }

  _inputCropHandler() {
    this._labelElement.style.setProperty('--size', `${this._cropElement.value}%`);
  }

  _inputPinkHandler() {
    this._labelElement.style.setProperty('--pink', this._pinkElement.value / 100);
  }

  _inputContrastHandler() {
    this._labelElement.style.setProperty('--contrast', this._contrastElement.value / 100);
  }

  _clickHandler(evt) {
    if (!evt.target.classList.contains('add__filter-toggler')) {
      return;
    }

    this._filterTogglerElements.forEach((togglerElement) => {
      const filterElement = togglerElement.closest('.add__filter');

      if (togglerElement === evt.target) {
        filterElement.classList.add('add__filter--active');
      } else {
        filterElement.classList.remove('add__filter--active');
      }
    });
  }

  _clearFilters(image) {
    this._cropElement.value = 100;
    this._pinkElement.value = 0;
    this._contrastElement.value = 100;

    this._labelElement.style.setProperty('--image', image);
    this._labelElement.style.setProperty('--size', '100%');
    this._labelElement.style.setProperty('--pink', 0);
    this._labelElement.style.setProperty('--contrast', 1);
  }

  _resetHandler(evt) {
    evt.preventDefault();

    this._clearFilters(this._defaultBg);
  }
}
