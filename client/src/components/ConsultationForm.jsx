import React from 'react'

export default function ConsultationForm() {
  return (
    <>
        <div>Consultation Form</div>

        <form>
            <div>
                <input type="text"
                    name="subject" />
            </div>

            <div>
                <input type="text"
                    name="message" />
            </div>
        </form>
    </>
  )
}
