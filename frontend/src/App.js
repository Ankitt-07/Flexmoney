// // App.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css'; // Import the CSS file


// const App = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     batchTime: '',
//     paymentAmount: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (parseFloat(formData.paymentAmount) < 500) {
//         console.error('Payment amount must be at least 500 Indian Rupees.');
//         return;
//       }

//       const response = await axios.post('http://localhost:3008/enroll', formData);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
//     <div className="container">
//       <h1 className="heading">Yoga Class Admission Form</h1>
//       <form className="form" onSubmit={handleSubmit}>
//         <label className="label">
//           Name:
//           <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="input" />
//         </label>
//         <br />
//         <label className="label">
//           Age:
//           <input type="number" name="age" value={formData.age} onChange={handleInputChange} required className="input" />
//         </label>
//         <br />
//         <label className="label">
//           Batch Time:
//           <select name="batchTime" value={formData.batchTime} onChange={handleInputChange} required className="input">
//             <option value="">Select Batch Time</option>
//             <option value="6-7AM">6-7AM</option>
//             <option value="7-8AM">7-8AM</option>
//             <option value="8-9AM">8-9AM</option>
//             <option value="5-6PM">5-6PM</option>
//           </select>
//         </label>
//         <br />
        
//         <label className="label">
//           Payment Amount (INR):
//           <input
//             type="number"
//             name="paymentAmount"
//             value={formData.paymentAmount}
//             onChange={handleInputChange}
//             required
//             className="input"
//           />
//         </label>
//         <br />
//         <button type="submit" className="button">Submit</button>
//       </form>
//     </div>
//   );
// };




// export default App;


// App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    batchTime: '',
    paymentAmount: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    submitted: false,
    success: false,
    error: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (parseFloat(formData.paymentAmount) < 500) {
        console.error('Payment amount must be at least 500 Indian Rupees.');
        setSubmissionStatus({ submitted: true, success: false, error: 'Payment amount must be at least 500 Indian Rupees.' });
        return;
      }

      const response = await axios.post('http://localhost:3008/enroll', formData);
      console.log(response.data);

      setSubmissionStatus({ submitted: true, success: true, error: null });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionStatus({ submitted: true, success: false, error: 'Internal Server Error' });
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Yoga Class Admission Form</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="input" />
        </label>
        <br />
        <label className="label">
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleInputChange} required className="input" />
        </label>
        <br />
        <label className="label">
          Batch Time:
          <select name="batchTime" value={formData.batchTime} onChange={handleInputChange} required className="input">
            <option value="">Select Batch Time</option>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>
        </label>
        <br />
        
        <label className="label">
          Payment Amount (INR):
          <input
            type="number"
            name="paymentAmount"
            value={formData.paymentAmount}
            onChange={handleInputChange}
            required
            className="input"
          />
        </label>
        <br />
        <button type="submit" className="button">Submit</button>
      </form>

      {submissionStatus.submitted && (
        <div className="submission-status">
          {submissionStatus.success ? (
            <p className="success-message"><p>Thank you for enrolling! Your payment has been successfully processed.</p>.</p>
          ) : (
            <p className="error-message">{submissionStatus.error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;

