// pages/PredyxAssessment.jsx - Updated with checkbox highlighting
import React, { useState, useRef, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiBaseUrl } from '../../config';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const HomePage = () => {
    // Form state - ALL fields in imperial units
    const [formData, setFormData] = useState({
        patient_name: '',
        age: '',
        sex: '',
        height_feet: '',
        height_inches: '',
        weight_lbs: '',
        waist_inches: '',
        hip_inches: '',
        sbp_mmHg: '',
        mobile_number: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pin_code: '',
        diabetes: false,
        hypertension: false,
        tobacco_use: false,
        prior_cad: false
    });

    const { id } = useParams();
    const navigate = useNavigate();
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [warnings, setWarnings] = useState([]);
    const [result, setResult] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [printLoading, setPrintLoading] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        if (id) {
        
        } else {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user?.patient_id) {
             
            } else {
              setError('User ID not found');
              setLoading(false);
            }
          } else {
            setError('Please login to continue');
            setLoading(false);
          }
        }
      }, [id]);

    // Logout Function
    const handleLogout = () => {
        localStorage.removeItem('authenticated');
        localStorage.removeItem('user');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('rememberMe');
        setShowLogoutModal(false);
        navigate('/login');
    };

    const confirmLogout = () => {
        setShowLogoutModal(true);
    };

    const reportRef = useRef(null);

    // Validation function
    const validateField = (name, value) => {
        let error = '';

        switch(name) {
            case 'patient_name':
                if (!value || value.trim().length < 2) {
                    error = 'Name must be at least 2 characters';
                } else if (!/^[a-zA-Z\s\-'.]+$/.test(value)) {
                    error = 'Name can only contain letters, spaces, hyphens, and apostrophes';
                }
                break;

            case 'age':
                if (!value) {
                    error = 'Age is required';
                } else {
                    const numValue = Number(value);
                    if (isNaN(numValue) || numValue < 18 || numValue > 100) {
                        error = 'Age must be between 18 and 100';
                    }
                }
                break;

            case 'sex':
                if (!value) {
                    error = 'Please select sex';
                }
                break;

            case 'mobile_number':
                if (value && !/^[0-9]{10}$/.test(value)) {
                    error = 'Mobile number must be 10 digits';
                }
                break;

            case 'email':
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Please enter a valid email address';
                }
                break;

            case 'pin_code':
                if (value && !/^[0-9]{6}$/.test(value)) {
                    error = 'Pincode must be 6 digits';
                }
                break;

            case 'height_feet':
                if (!value) {
                    error = 'Height is required';
                } else {
                    const numValue = Number(value);
                    if (isNaN(numValue) || numValue < 3 || numValue > 7) {
                        error = 'Height must be between 3 and 7 feet';
                    }
                }
                break;

            case 'height_inches':
                if (value) {
                    const numValue = Number(value);
                    if (isNaN(numValue) || numValue < 0 || numValue > 11) {
                        error = 'Inches must be between 0 and 11';
                    }
                }
                break;

            case 'weight_lbs':
                if (!value) {
                    error = 'Weight is required';
                } else {
                    const numValue = Number(value);
                    if (isNaN(numValue) || numValue < 55 || numValue > 550) {
                        error = 'Weight must be between 55 and 550 lbs';
                    }
                }
                break;

            case 'waist_inches':
                if (!value) {
                    error = 'Waist is required';
                } else {
                    const numValue = Number(value);
                    if (isNaN(numValue) || numValue < 16 || numValue > 80) {
                        error = 'Waist must be between 16 and 80 inches';
                    }
                }
                break;

            case 'hip_inches':
                if (!value) {
                    error = 'Hip is required';
                } else {
                    const numValue = Number(value);
                    if (isNaN(numValue) || numValue < 16 || numValue > 87) {
                        error = 'Hip must be between 16 and 87 inches';
                    }
                }
                break;

            case 'sbp_mmHg':
                if (!value) {
                    error = 'SBP is required';
                } else {
                    const numValue = Number(value);
                    if (isNaN(numValue) || numValue < 70 || numValue > 260) {
                        error = 'SBP must be between 70 and 260 mmHg';
                    }
                }
                break;

            default:
                break;
        }

        return error;
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));

        const error = validateField(name, newValue);
        setFieldErrors(prev => ({
            ...prev,
            [name]: error
        }));

        setError(null);
    };

    // Handle number input
    const handleNumberInput = (e) => {
        const { name, value } = e.target;
        
        const cleanedValue = value.replace(/[^0-9.]/g, '');
        const parts = cleanedValue.split('.');
        if (parts.length > 2) return;
        if (cleanedValue === '.') return;

        setFormData(prev => ({
            ...prev,
            [name]: cleanedValue
        }));

        const error = validateField(name, cleanedValue);
        setFieldErrors(prev => ({
            ...prev,
            [name]: error
        }));

        setError(null);
    };

    // Validate entire step
    const validateStep = (step) => {
        let stepErrors = {};
        let isValid = true;

        if (step === 1) {
            const nameError = validateField('patient_name', formData.patient_name);
            if (nameError) {
                stepErrors.patient_name = nameError;
                isValid = false;
            }

            const ageError = validateField('age', formData.age);
            if (ageError) {
                stepErrors.age = ageError;
                isValid = false;
            }

            const sexError = validateField('sex', formData.sex);
            if (sexError) {
                stepErrors.sex = sexError;
                isValid = false;
            }

            if (formData.mobile_number) {
                const mobileError = validateField('mobile_number', formData.mobile_number);
                if (mobileError) {
                    stepErrors.mobile_number = mobileError;
                    isValid = false;
                }
            }

            if (formData.email) {
                const emailError = validateField('email', formData.email);
                if (emailError) {
                    stepErrors.email = emailError;
                    isValid = false;
                }
            }

        } else if (step === 2) {
            if (formData.pin_code) {
                const pinError = validateField('pin_code', formData.pin_code);
                if (pinError) {
                    stepErrors.pin_code = pinError;
                    isValid = false;
                }
            }

        } else if (step === 3) {
            const heightFeetError = validateField('height_feet', formData.height_feet);
            if (heightFeetError) {
                stepErrors.height_feet = heightFeetError;
                isValid = false;
            }
            
            if (formData.height_inches) {
                const heightInchesError = validateField('height_inches', formData.height_inches);
                if (heightInchesError) {
                    stepErrors.height_inches = heightInchesError;
                    isValid = false;
                }
            }

            const weightError = validateField('weight_lbs', formData.weight_lbs);
            if (weightError) {
                stepErrors.weight_lbs = weightError;
                isValid = false;
            }

            const waistError = validateField('waist_inches', formData.waist_inches);
            if (waistError) {
                stepErrors.waist_inches = waistError;
                isValid = false;
            }

            const hipError = validateField('hip_inches', formData.hip_inches);
            if (hipError) {
                stepErrors.hip_inches = hipError;
                isValid = false;
            }

        } else if (step === 4) {
            const sbpError = validateField('sbp_mmHg', formData.sbp_mmHg);
            if (sbpError) {
                stepErrors.sbp_mmHg = sbpError;
                isValid = false;
            }
        }

        setFieldErrors(stepErrors);
        return isValid;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setFieldErrors({});
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
        setFieldErrors({});
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateStep(4)) return;

        if (formData.sbp_mmHg >= 180 || formData.prior_cad) {
            setShowConfirm(true);
            return;
        }

        setShowSubmitConfirm(true);
    };

    const confirmSubmit = () => {
        setShowSubmitConfirm(false);
        submitAssessment();
    };

    const cancelSubmit = () => {
        setShowSubmitConfirm(false);
    };

    const submitAssessment = async () => {
        setLoading(true);
        setError(null);

        try {
            const payload = {
                ...formData,
                id: id,
                age: parseInt(formData.age),
                height_feet: parseInt(formData.height_feet) || 0,
                height_inches: parseInt(formData.height_inches) || 0,
                weight_lbs: parseFloat(formData.weight_lbs),
                waist_inches: parseFloat(formData.waist_inches),
                hip_inches: parseFloat(formData.hip_inches),
                sbp_mmHg: parseInt(formData.sbp_mmHg)
            };

            const response = await axios.post(`${apiBaseUrl}/assessments`, payload);

            if (response.data.success) {
                const responseData = response.data.data || response.data;
                
                const resultData = {
                    assessment_id: responseData.assessment_id || response.data.assessment_id,
                    assessment_code: responseData.assessment_code || response.data.assessment_code,
                    patient: responseData.patient || {
                        name: formData.patient_name,
                        age: parseInt(formData.age),
                        sex: formData.sex,
                        mobile: formData.mobile_number,
                        email: formData.email,
                        address: formData.address,
                        city: formData.city,
                        state: formData.state,
                        pin_code: formData.pin_code
                    },
                    raw_inputs: responseData.raw_inputs || {
                        height_feet: parseInt(formData.height_feet) || 0,
                        height_inches: parseInt(formData.height_inches) || 0,
                        weight_lbs: parseFloat(formData.weight_lbs),
                        waist_inches: parseFloat(formData.waist_inches),
                        hip_inches: parseFloat(formData.hip_inches),
                        sbp_mmHg: parseInt(formData.sbp_mmHg),
                        diabetes: formData.diabetes,
                        hypertension: formData.hypertension,
                        tobacco_use: formData.tobacco_use,
                        prior_cad: formData.prior_cad
                    },
                    derived: responseData.derived || {},
                    domain_scores: responseData.domain_scores || {},
                    contributors: responseData.contributors || {},
                    predyx_pbs: responseData.predyx_pbs || 0,
                    risk_band: responseData.risk_band || 'Unknown',
                    priority: responseData.priority || 'Unknown',
                    interpretation: responseData.interpretation || '',
                    recommendations: responseData.recommendations || [],
                    top_drivers: responseData.top_drivers || [],
                    flags: responseData.flags || {},
                    created_at: responseData.created_at || new Date().toISOString()
                };

                setResult(resultData);
                setShowResult(true);
                if (response.data.warnings) {
                    setWarnings(response.data.warnings);
                }
            } else {
                setError(response.data.message || 'Failed to submit assessment');
            }
        } catch (err) {
            console.error('Submission error:', err);
            setError(err.response?.data?.message || err.message || 'Failed to submit assessment');
        } finally {
            setLoading(false);
            setShowConfirm(false);
        }
    };

    // PDF Generation Function
    const generatePDF = async () => {
        if (!result) return;
        
        setPdfLoading(true);
        
        try {
            const reportElement = reportRef.current;
            if (!reportElement) {
                throw new Error('Report element not found');
            }

            const canvas = await html2canvas(reportElement, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 0;
            const imgScaledWidth = imgWidth * ratio;
            const imgScaledHeight = imgHeight * ratio;

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgScaledWidth, imgScaledHeight);
            
            const fileName = `Predyx_Assessment_${result.assessment_code || result.assessment_id || 'report'}_${new Date().toISOString().split('T')[0]}.pdf`;
            pdf.save(fileName);
            
        } catch (error) {
            console.error('PDF generation error:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setPdfLoading(false);
        }
    };

    // Print Function
    const handlePrint = () => {
        if (!result) return;
        
        setPrintLoading(true);
        
        try {
            const printContent = document.getElementById('report-content');
            if (!printContent) {
                alert('Report content not found');
                setPrintLoading(false);
                return;
            }

            const printWindow = window.open('', '_blank', 'width=900,height=700');
            
            if (!printWindow) {
                alert('Please allow pop-ups to print the report');
                setPrintLoading(false);
                return;
            }

            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>Predyx Assessment Report</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 40px; }
                            .print-container { max-width: 1100px; margin: 0 auto; }
                            .score-card { background: #1a237e; color: white; padding: 30px; border-radius: 8px; }
                            .result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                            .result-section { border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
                            .full-width { grid-column: 1 / -1; }
                            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                            .measurements-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                            .domain-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                            .domain-item { display: flex; justify-content: space-between; padding: 8px; background: #f5f5f5; }
                            .driver-item { display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid #eee; }
                            .recommendations-list { list-style: none; padding: 0; }
                            .recommendations-list li { padding: 8px; border-bottom: 1px solid #eee; }
                            .report-footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #ddd; }
                            @media print { body { padding: 20px; } }
                        </style>
                    </head>
                    <body>
                        <div class="print-container">
                            ${printContent.innerHTML}
                        </div>
                        <script>
                            window.onload = function() {
                                setTimeout(function() {
                                    window.print();
                                    setTimeout(function() { window.close(); }, 1000);
                                }, 500);
                            };
                        <\/script>
                    </body>
                </html>
            `);
            
            printWindow.document.close();
            
        } catch (error) {
            console.error('Print error:', error);
            alert('Failed to print report. Please try again.');
        } finally {
            setPrintLoading(false);
        }
    };

    // RESET FORM FUNCTION
    const resetForm = () => {
        setFormData({
            patient_name: '',
            age: '',
            sex: '',
            height_feet: '',
            height_inches: '',
            weight_lbs: '',
            waist_inches: '',
            hip_inches: '',
            sbp_mmHg: '',
            mobile_number: '',
            email: '',
            address: '',
            city: '',
            state: '',
            pin_code: '',
            diabetes: false,
            hypertension: false,
            tobacco_use: false,
            prior_cad: false
        });
        setFieldErrors({});
        setResult(null);
        setShowResult(false);
        setError(null);
        setWarnings([]);
        setCurrentStep(1);
        setLoading(false);
        setPdfLoading(false);
        setPrintLoading(false);
        setShowSubmitConfirm(false);
        setShowConfirm(false);
    };

    const getPriorityColor = (priority) => {
        if (!priority) return 'low';
        if (priority === 'Urgent Review') return 'urgent';
        if (priority === 'High Review') return 'high';
        if (priority === 'High') return 'warning';
        if (priority === 'Moderate') return 'moderate';
        return 'low';
    };

    const getBandColor = (band) => {
        if (!band) return '#6c757d';
        switch(band.toLowerCase()) {
            case 'low': return '#28a745';
            case 'mild': return '#ffc107';
            case 'moderate': return '#fd7e14';
            case 'high': return '#dc3545';
            case 'very high': return '#c00';
            default: return '#6c757d';
        }
    };

    // Render Result Screen
    if (showResult && result) {
        const rawInputs = result.raw_inputs || {};
        const derived = result.derived || {};
        const domainScores = result.domain_scores || {};
        const patient = result.patient || {};
        const topDrivers = result.top_drivers || [];
        const recommendations = result.recommendations || [];

        return (
            <div className="result-container">
                <div className="result-header">
                    <h2>📋 Assessment Report</h2>
                    <button className="btn-close" onClick={resetForm}>×</button>
                </div>

                <div ref={reportRef} className="report-content" id="report-content">
                    {warnings.length > 0 && (
                        <div className="warning-banner">
                            <h4>⚠️ Warnings</h4>
                            {warnings.map((w, i) => <p key={i}>• {w}</p>)}
                        </div>
                    )}

                    <div className="report-header">
                        <h1>Predyx Quick Assessment Report</h1>
                        <div className="report-meta">
                            <span>Assessment ID: {result.assessment_code || result.assessment_id || 'N/A'}</span>
                            <span>Date: {new Date().toLocaleDateString()}</span>
                            <span>Time: {new Date().toLocaleTimeString()}</span>
                        </div>
                    </div>

                    <div className="score-card">
                        <div className="score-big">
                            <div className="score-number">{result.predyx_pbs || 0}</div>
                            <div className="score-label">PBS Score</div>
                        </div>
                        <div className="score-divider"></div>
                        <div className="score-details">
                            <div className="band" style={{ background: getBandColor(result.risk_band), color: 'white' }}>
                                {result.risk_band || 'Unknown'}
                            </div>
                            <div className={`priority priority-${getPriorityColor(result.priority)}`}>
                                Priority: {result.priority || 'Unknown'}
                            </div>
                        </div>
                    </div>

                    <div className="result-grid">
                        <div className="result-section">
                            <h3>👤 Patient Information</h3>
                            <div className="info-grid">
                                <div><strong>Name:</strong> {patient.name || 'N/A'}</div>
                                <div><strong>Age:</strong> {patient.age || 'N/A'}</div>
                                <div><strong>Sex:</strong> {patient.sex || 'N/A'}</div>
                                {patient.mobile && <div><strong>Mobile:</strong> {patient.mobile}</div>}
                                {patient.email && <div><strong>Email:</strong> {patient.email}</div>}
                            </div>
                        </div>

                        {(patient.address || patient.city || patient.state || patient.pin_code) && (
                            <div className="result-section">
                                <h3>📍 Address</h3>
                                <div className="info-grid">
                                    {patient.address && <div><strong>Address:</strong> {patient.address}</div>}
                                    {patient.city && <div><strong>City:</strong> {patient.city}</div>}
                                    {patient.state && <div><strong>State:</strong> {patient.state}</div>}
                                    {patient.pin_code && <div><strong>Pincode:</strong> {patient.pin_code}</div>}
                                </div>
                            </div>
                        )}

                        <div className="result-section">
                            <h3>📏 Measurements</h3>
                            <div className="measurements-grid">
                                <div><strong>Height:</strong> {rawInputs.height_feet || 0}ft {rawInputs.height_inches || 0}in</div>
                                <div><strong>Weight:</strong> {rawInputs.weight_lbs || 'N/A'} lbs</div>
                                <div><strong>BMI:</strong> {derived.bmi || 'N/A'} ({derived.bmi_category || 'N/A'})</div>
                                <div><strong>Waist:</strong> {rawInputs.waist_inches || 'N/A'} in</div>
                                <div><strong>Hip:</strong> {rawInputs.hip_inches || 'N/A'} in</div>
                                <div><strong>WHR:</strong> {derived.whr || 'N/A'}</div>
                                <div><strong>WHtR:</strong> {derived.whtr || 'N/A'} ({derived.whtr_category || 'N/A'})</div>
                                <div><strong>SBP:</strong> {rawInputs.sbp_mmHg || 'N/A'} mmHg</div>
                                <div><strong>Central Obesity:</strong> {derived.central_obesity ? 'Yes' : 'No'}</div>
                            </div>
                        </div>

                        <div className="result-section">
                            <h3>📈 Domain Scores</h3>
                            <div className="domain-grid">
                                <div className="domain-item">
                                    <span>Constitutional</span>
                                    <span className="domain-value">{domainScores.constitutional || 0}/15</span>
                                </div>
                                <div className="domain-item">
                                    <span>Adiposity</span>
                                    <span className="domain-value">{domainScores.adiposity || 0}/30</span>
                                </div>
                                <div className="domain-item">
                                    <span>Hemodynamic</span>
                                    <span className="domain-value">{domainScores.hemodynamic || 0}/15</span>
                                </div>
                                <div className="domain-item">
                                    <span>Behaviour</span>
                                    <span className="domain-value">{domainScores.behaviour || 0}/10</span>
                                </div>
                                <div className="domain-item">
                                    <span>Disease</span>
                                    <span className="domain-value">{domainScores.disease || 0}/30</span>
                                </div>
                            </div>
                        </div>

                        <div className="result-section">
                            <h3>🎯 Top Risk Drivers</h3>
                            <div className="drivers-list">
                                {topDrivers.length > 0 ? (
                                    topDrivers.map((driver, i) => (
                                        <div key={i} className="driver-item">
                                            <span className="driver-name">{i+1}. {driver.label || 'Unknown'}</span>
                                            <span className="driver-points">+{driver.points || 0}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p>No risk drivers identified</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="result-section full-width">
                        <h3>💬 Clinical Interpretation</h3>
                        <p className="interpretation-text">{result.interpretation || 'No interpretation available'}</p>
                    </div>

                    <div className="result-section full-width">
                        <h3>💡 Recommendations</h3>
                        <ul className="recommendations-list">
                            {recommendations.length > 0 ? (
                                recommendations.map((rec, i) => (
                                    <li key={i}>{rec}</li>
                                ))
                            ) : (
                                <li>No recommendations available</li>
                            )}
                        </ul>
                    </div>

                    <div className="report-footer">
                        <p className="disclaimer">⚠️ This is a screening report, not a diagnosis. Please consult your doctor for medical advice.</p>
                        <p className="engine-info">Engine: Predyx Quick v1.0 | Assessment ID: {result.assessment_code || result.assessment_id || 'N/A'}</p>
                    </div>
                </div>

                <div className="result-actions">
                    <button onClick={generatePDF} className="btn-pdf" disabled={pdfLoading}>
                        {pdfLoading ? '⏳ Generating PDF...' : '📥 Download PDF Report'}
                    </button>
                    <button onClick={handlePrint} className="btn-print" disabled={printLoading}>
                        {printLoading ? '⏳ Loading...' : '🖨️ Print Report'}
                    </button>
                    <button onClick={resetForm} className="btn-new">
                        New Assessment
                    </button>
                </div>
            </div>
        );
    }

    // Render Form
    return (
        <div className="assessment-container">
            <div className="assessment-header">
                <h1>Predyx Quick Assessment</h1>
                <p>Preventive Cardiometabolic Burden Screening</p>
            </div>

            <div className="progress-bar">
                <div className="progress-steps">
                    {[1, 2, 3, 4].map(step => (
                        <div key={step} className={`step ${step === currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}>
                            <span className="step-number">{step}</span>
                            <span className="step-label">
                                {step === 1 ? 'Patient' : step === 2 ? 'Address' : step === 3 ? 'Measurements' : 'Clinical'}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="progress-fill" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
            </div>

            <form onSubmit={handleSubmit} className="assessment-form">
                {error && <div className="error-message">{error}</div>}

                {/* Step 1: Patient Information */}
                {currentStep === 1 && (
                    <div className="form-step">
                        <div className="form-section">
                            <h3>👤 Patient Information</h3>
                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label>Full Name *</label>
                                    <input
                                        type="text"
                                        name="patient_name"
                                        value={formData.patient_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter patient's full name"
                                    />
                                    {fieldErrors.patient_name && (
                                        <span className="field-error">{fieldErrors.patient_name}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="mobile_number"
                                        value={formData.mobile_number}
                                        onChange={handleInputChange}
                                        placeholder="Enter 10-digit mobile number"
                                        maxLength="10"
                                    />
                                    {fieldErrors.mobile_number && (
                                        <span className="field-error">{fieldErrors.mobile_number}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter email address"
                                    />
                                    {fieldErrors.email && (
                                        <span className="field-error">{fieldErrors.email}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Age (years) *</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleNumberInput}
                                        placeholder="18-100"
                                        min="18"
                                        max="100"
                                    />
                                    {fieldErrors.age && (
                                        <span className="field-error">{fieldErrors.age}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Sex *</label>
                                    <select
                                        name="sex"
                                        value={formData.sex}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {fieldErrors.sex && (
                                        <span className="field-error">{fieldErrors.sex}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Address Information */}
                {currentStep === 2 && (
                    <div className="form-step">
                        <div className="form-section">
                            <h3>📍 Address Information</h3>
                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter address"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="Enter city"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        placeholder="Enter state"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Pincode</label>
                                    <input
                                        type="text"
                                        name="pin_code"
                                        value={formData.pin_code}
                                        onChange={handleInputChange}
                                        placeholder="Enter 6-digit pincode"
                                        maxLength="6"
                                    />
                                    {fieldErrors.pin_code && (
                                        <span className="field-error">{fieldErrors.pin_code}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Anthropometry with all imperial units */}
                {currentStep === 3 && (
                    <div className="form-step">
                        <div className="form-section">
                            <h3>📏 Body Measurements (Imperial)</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Height (feet) *</label>
                                    <input
                                        type="number"
                                        name="height_feet"
                                        value={formData.height_feet}
                                        onChange={handleNumberInput}
                                        placeholder="3-7"
                                        min="3"
                                        max="7"
                                        step="1"
                                    />
                                    {fieldErrors.height_feet && (
                                        <span className="field-error">{fieldErrors.height_feet}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Height (inches)</label>
                                    <input
                                        type="number"
                                        name="height_inches"
                                        value={formData.height_inches}
                                        onChange={handleNumberInput}
                                        placeholder="0-11"
                                        min="0"
                                        max="11"
                                        step="1"
                                    />
                                    {fieldErrors.height_inches && (
                                        <span className="field-error">{fieldErrors.height_inches}</span>
                                    )}
                                    <small className="helper-text">Example: 5 feet 8 inches</small>
                                </div>

                                <div className="form-group">
                                    <label>Weight (lbs) *</label>
                                    <input
                                        type="number"
                                        name="weight_lbs"
                                        value={formData.weight_lbs}
                                        onChange={handleNumberInput}
                                        placeholder="55-550"
                                        min="55"
                                        max="550"
                                        step="0.5"
                                    />
                                    {fieldErrors.weight_lbs && (
                                        <span className="field-error">{fieldErrors.weight_lbs}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Waist (inches) *</label>
                                    <input
                                        type="number"
                                        name="waist_inches"
                                        value={formData.waist_inches}
                                        onChange={handleNumberInput}
                                        placeholder="16-80"
                                        min="16"
                                        max="80"
                                        step="0.5"
                                    />
                                    {fieldErrors.waist_inches && (
                                        <span className="field-error">{fieldErrors.waist_inches}</span>
                                    )}
                                    <small className="helper-text">Measure at narrowest point</small>
                                </div>

                                <div className="form-group">
                                    <label>Hip (inches) *</label>
                                    <input
                                        type="number"
                                        name="hip_inches"
                                        value={formData.hip_inches}
                                        onChange={handleNumberInput}
                                        placeholder="16-87"
                                        min="16"
                                        max="87"
                                        step="0.5"
                                    />
                                    {fieldErrors.hip_inches && (
                                        <span className="field-error">{fieldErrors.hip_inches}</span>
                                    )}
                                    <small className="helper-text">Measure at widest point</small>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Clinical & History */}
                {currentStep === 4 && (
                    <div className="form-step">
                        <div className="form-section">
                            <h3>🩺 Clinical Measurements</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Systolic BP (mmHg) *</label>
                                    <input
                                        type="number"
                                        name="sbp_mmHg"
                                        value={formData.sbp_mmHg}
                                        onChange={handleNumberInput}
                                        placeholder="70-260"
                                        min="70"
                                        max="260"
                                    />
                                    {fieldErrors.sbp_mmHg && (
                                        <span className="field-error">{fieldErrors.sbp_mmHg}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* UPDATED: Medical History with Highlighting */}
                        <div className="form-section">
                            <h3>📋 Medical History</h3>
                            <div className="checkbox-grid">
                                <label className={`checkbox-label ${formData.diabetes ? 'selected' : ''}`}>
                                    <input
                                        type="checkbox"
                                        name="diabetes"
                                        checked={formData.diabetes === true}
                                        onChange={handleInputChange}
                                    />
                                    <span className="checkbox-text">Diabetes</span>
                                    {formData.diabetes && <span className="checkbox-badge">✓</span>}
                                </label>
                                <label className={`checkbox-label ${formData.hypertension ? 'selected' : ''}`}>
                                    <input
                                        type="checkbox"
                                        name="hypertension"
                                        checked={formData.hypertension === true}
                                        onChange={handleInputChange}
                                    />
                                    <span className="checkbox-text">Hypertension</span>
                                    {formData.hypertension && <span className="checkbox-badge">✓</span>}
                                </label>
                                <label className={`checkbox-label ${formData.tobacco_use ? 'selected' : ''}`}>
                                    <input
                                        type="checkbox"
                                        name="tobacco_use"
                                        checked={formData.tobacco_use === true}
                                        onChange={handleInputChange}
                                    />
                                    <span className="checkbox-text">Tobacco Use</span>
                                    {formData.tobacco_use && <span className="checkbox-badge">✓</span>}
                                </label>
                                <label className={`checkbox-label ${formData.prior_cad ? 'selected' : ''}`}>
                                    <input
                                        type="checkbox"
                                        name="prior_cad"
                                        checked={formData.prior_cad === true}
                                        onChange={handleInputChange}
                                    />
                                    <span className="checkbox-text">Prior CAD</span>
                                    {formData.prior_cad && <span className="checkbox-badge">✓</span>}
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                <div className="form-actions">
                    {currentStep > 1 && (
                        <button type="button" onClick={prevStep} className="btn-prev">
                            ← Previous
                        </button>
                    )}
                    {currentStep < 4 ? (
                        <button type="button" onClick={nextStep} className="btn-next">
                            Next →
                        </button>
                    ) : (
                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? 'Processing...' : 'Submit Assessment'}
                        </button>
                    )}
                    <button type="button" onClick={resetForm} className="btn-reset">
                        Reset
                    </button>
                </div>
            </form>

            {/* Submit Confirmation Modal */}
            {showSubmitConfirm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>📋 Confirm Submission</h3>
                        <div className="confirm-icon">⚠️</div>
                        <p>Are you sure you want to submit this assessment?</p>
                        <div className="confirm-details">
                            <p><strong>Patient:</strong> {formData.patient_name || 'Not provided'}</p>
                            <p><strong>Age:</strong> {formData.age || 'Not provided'} years</p>
                            <p><strong>Sex:</strong> {formData.sex || 'Not provided'}</p>
                            <p><strong>Measurements:</strong></p>
                            <ul>
                                <li>Height: {formData.height_feet || 0}ft {formData.height_inches || 0}in</li>
                                <li>Weight: {formData.weight_lbs || 'N/A'} lbs</li>
                                <li>Waist: {formData.waist_inches || 'N/A'} in</li>
                                <li>Hip: {formData.hip_inches || 'N/A'} in</li>
                                <li>SBP: {formData.sbp_mmHg || 'N/A'} mmHg</li>
                            </ul>
                            <p><strong>Medical History:</strong></p>
                            <ul>
                                {formData.diabetes && <li>• Diabetes</li>}
                                {formData.hypertension && <li>• Hypertension</li>}
                                {formData.tobacco_use && <li>• Tobacco Use</li>}
                                {formData.prior_cad && <li>• Prior CAD</li>}
                                {!formData.diabetes && !formData.hypertension && !formData.tobacco_use && !formData.prior_cad && <li>• No conditions reported</li>}
                            </ul>
                        </div>
                        <p className="confirm-warning">Please review the information before proceeding.</p>
                        <div className="modal-actions">
                            <button onClick={confirmSubmit} className="btn-confirm" disabled={loading}>
                                {loading ? 'Submitting...' : '✅ Yes, Submit'}
                            </button>
                            <button onClick={cancelSubmit} className="btn-cancel">
                                ❌ Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* High Risk Confirmation Modal */}
            {showConfirm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>⚠️ High Risk Confirmation</h3>
                        <p>This assessment shows potential high-risk markers:</p>
                        <ul>
                            {formData.sbp_mmHg >= 180 && <li>• Very high blood pressure reading ({formData.sbp_mmHg} mmHg)</li>}
                            {formData.prior_cad && <li>• Known coronary artery disease history</li>}
                        </ul>
                        <p>Do you want to proceed with the assessment?</p>
                        <div className="modal-actions">
                            <button onClick={confirmSubmit} className="btn-confirm" disabled={loading}>
                                {loading ? 'Processing...' : 'Yes, Proceed'}
                            </button>
                            <button onClick={() => setShowConfirm(false)} className="btn-cancel">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;