/**
 * Server-side validation for Employer Opportunity Posting (Rajasthan-First)
 */

export const RAJASTHAN_DISTRICTS = [
  'Jaipur', 'Jodhpur', 'Kota', 'Udaipur', 'Ajmer', 'Alwar', 'Bikaner', 
  'Bharatpur', 'Bhilwara', 'Sikar', 'Sri Ganganagar', 'Pali', 'Barmer', 
  'Chittorgarh', 'Tonk', 'Rajsamand', 'Nagaur', 'Jhunjhunu', 'Jhalawar', 
  'Churu', 'Dausa', 'Dholpur', 'Hanumangarh', 'Jalore', 'Jaisalmer', 
  'Karauli', 'Pratapgarh', 'Sawai Madhopur', 'Sirohi', 'Banswara', 
  'Baran', 'Dungarpur', 'Beawar', 'Balotra', 'Deeg', 'Didwana-Kuchaman', 
  'Dudu', 'Gangapur City', 'Jaipur Rural', 'Jodhpur Rural', 'Kotputli-Behror', 
  'Khairthal-Tijara', 'Neem Ka Thana', 'Phalodi', 'Salumber', 'Sanchore', 'Shahpura',
  'Remote'
];

export const validateOpportunity = (payload = {}, isDraft = false) => {
  const errors = {};

  // Title is the only strictly required user input
  if (!payload.title || typeof payload.title !== 'string' || payload.title.trim().length === 0) {
    errors.title = "Opportunity title is required.";
  }

  // Compensation validation only if explicitly provided with invalid inverted range
  const minSal = Number(payload.salary_min);
  const maxSal = Number(payload.salary_max);
  if (!isNaN(minSal) && !isNaN(maxSal) && minSal > maxSal && minSal > 0 && maxSal > 0) {
    errors.salary = "Minimum salary cannot exceed maximum salary.";
  }

  const minStipend = Number(payload.stipend_min);
  const maxStipend = Number(payload.stipend_max);
  if (!isNaN(minStipend) && !isNaN(maxStipend) && minStipend > maxStipend && minStipend > 0 && maxStipend > 0) {
    errors.stipend = "Minimum stipend cannot exceed maximum stipend.";
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
};
