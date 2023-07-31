import React, { useState } from 'react';
import cityData from '../../data/CityCountyData.json';
import options from '../../data/item2.json';
import './productTop.scss';

function ProductTop({ onSearchSubmit }) {
  //小類大類
  const [selectedCategory, setSelectedCategory] = useState('');
  //縣市
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCategory(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setCity(e.target.value);
  };

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
    setArea(e.target.value);
  };

  //搜尋
  const [keyword, setKeyword] = useState('');
  const [Category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [subOption, setsubOption] = useState('');
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const params = {
      cityCounty: city,
      area: area,
      productCategoryID: Category,
      productCategoryChild: subOption,
      productName: keyword,
    };

    onSearchSubmit(params);
  };

  return (
    <>
      <div className="category-section">
        <div className="category-section-title">
          <form
            id="search-group"
            onSubmit={handleFormSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFormSubmit(e);
              }
            }}
          >
            <div className="form-search">
              <input
                type="text"
                id="keyW"
                placeholder="關鍵字"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button type="submit" id="search-button">
                <i className="bi bi-search"></i>
              </button>
            </div>
            <div id="search-form">
              <div className="form-group">
                <select
                  className="form-control"
                  id="category-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">類別</option>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="arrow-icon">&#x25BC;</div>
              </div>
              <div className="form-group">
                <select
                  className="form-control"
                  id="sub-category-select"
                  onChange={(e) => {
                    setsubOption(e.target.value);
                  }}
                >
                  <option value="">小類</option>
                  {selectedCategory ? null : <option value=""></option>}
                  {options
                    .find((option) => option.value === selectedCategory)
                    ?.subOptions.map((subOption) => (
                      <option key={subOption.label} value={subOption.value}>
                        {subOption.label}
                      </option>
                    ))}
                </select>
                <div className="arrow-icon">&#x25BC;</div>
              </div>
              <div className="form-group">
                <select
                  className="form-control"
                  value={selectedCity}
                  onChange={handleCityChange}
                >
                  <option value="">選擇縣市</option>
                  {cityData.map((city) => (
                    <option key={city.CityName} value={city.CityName}>
                      {city.CityName}
                    </option>
                  ))}
                </select>
                <div className="arrow-icon">&#x25BC;</div>
              </div>

              <div className="form-group">
                <select
                  className="form-control"
                  value={selectedArea}
                  onChange={handleAreaChange}
                >
                  <option value="">選擇區域</option>
                  {selectedCity ? null : <option value=""></option>}
                  {cityData.map((city) => {
                    if (city.CityName === selectedCity) {
                      return city.AreaList.map((area) => (
                        <option key={area.ZipCode} value={area.AreaName}>
                          {area.AreaName}
                        </option>
                      ));
                    }
                    return null;
                  })}
                </select>
                <div className="arrow-icon">&#x25BC;</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProductTop;
