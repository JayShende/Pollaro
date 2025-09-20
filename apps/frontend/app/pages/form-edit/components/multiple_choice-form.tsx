import React from 'react'

const MultipleChoice = () => {
  return (
    <div>
                  <p>Multiple Choice configuration options will appear here</p>
                  <div className="space-y-2 mt-2">
                    <input
                      type="text"
                      placeholder="Option 1"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Option 2"
                      className="w-full p-2 border rounded"
                    />
                    <button type="button" className="text-blue-600">
                      + Add Option
                    </button>
                  </div>
                </div>
  )
}

export default MultipleChoice