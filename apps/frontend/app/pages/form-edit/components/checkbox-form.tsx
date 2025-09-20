import React from 'react'

const Checkbox = () => {
  return (
    <div>
    <p>Checkbox configuration options will appear here</p>
    <div className="space-y-2 mt-2">
      <label className="flex items-center">
        <input type="checkbox" className="mr-2" />
        <span>Checkbox Option 1</span>
      </label>
      <label className="flex items-center">
        <input type="checkbox" className="mr-2" />
        <span>Checkbox Option 2</span>
      </label>
      <button type="button" className="text-blue-600">
        + Add Option
      </button>
    </div>
  </div>
  )
}

export default Checkbox