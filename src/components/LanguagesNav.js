import React from 'react'
import PropTypes from 'prop-types'

function LanguagesNav({ selectedLanguage, updateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'React', 'CSS', 'Python']
  return (
    <ul className='flex-center'>
      {languages.map((lang) => {
        return (
          <li key={lang}>
            <button
              className='btn-clear nav-link'
              style={
                lang === selectedLanguage ? { color: 'rgb(187,46,31)' } : null
              }
              onClick={() => updateLanguage(lang)}
            >
              {lang}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
LanguagesNav.propType = {
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired,
}
export default LanguagesNav
