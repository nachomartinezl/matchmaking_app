// This component also needs to be a Client Component
'use client'; 

interface StepProps {
  formData: {
    name: string;
    surname: string;
    dob: string;
    gender: string;
  };
  updateFormData: (data: Partial<StepProps['formData']>) => void;
  nextStep: () => void;
}

export default function Step1_PersonalData({ formData, updateFormData, nextStep }: StepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };
  
  return (
    <div className="form-step">
      <h2>Personal Data</h2>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your first name" />
      
      <label htmlFor="surname">Surname</label>
      <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleChange} placeholder="Your last name" />
      
      <label htmlFor="dob">Date of Birth</label>
      <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
      
      <label htmlFor="gender">Gender</label>
      <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="non-binary">Non-binary</option>
        <option value="other">Other</option>
      </select>
      
      <div className="button-group">
        {/* No "Back" button on the first step */}
        <button onClick={nextStep} className="button-primary" style={{marginLeft: 'auto'}}>Next</button>
      </div>
    </div>
  );
}