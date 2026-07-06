// pages/PredyxAssessment.jsx - Complete Version With All Document Fields
import React, { useState, useRef } from 'react';
import { apiBaseUrl } from '../../config';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const HomePage = () => {
    // Form state - ALL fields from document
    const [formData, setFormData] = useState({
        // Required fields (document Section 3)
        patient_name: '',
        age: '',
        sex: '',
        height_cm: '',
        weight_kg: '',
        waist_cm: '',
        hip_cm: '',
        sbp_mmHg: '',
        
        // Optional fields (document Section 3)
        mobile_number: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pin_code: '',
        
        // Boolean fields (document Section 3)
        diabetes: false,
        hypertension: false,
        tobacco_use: false,
        prior_cad: false
    });

    // UI states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [warnings, setWarnings] = useState([]);
    const [result, setResult] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [printLoading, setPrintLoading] = useState(false);
    const totalSteps = 4;
    
    // Reference for PDF generation
    const reportRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        
        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));
        setError(null);
    };

    const validateStep = (step) => {
        if (step === 1) {
            if (!formData.patient_name || !formData.age || !formData.sex) {
                setError('Please fill all patient information fields');
                return false;
            }
            if (formData.age < 18 || formData.age > 100) {
                setError('Age must be between 18 and 100');
                return false;
            }
        } else if (step === 2) {
            return true;
        } else if (step === 3) {
            if (!formData.height_cm || !formData.weight_kg || 
                !formData.waist_cm || !formData.hip_cm) {
                setError('Please fill all anthropometry fields');
                return false;
            }
            if (formData.height_cm < 120 || formData.height_cm > 230) {
                setError('Height must be between 120 and 230 cm');
                return false;
            }
            if (formData.weight_kg < 25 || formData.weight_kg > 250) {
                setError('Weight must be between 25 and 250 kg');
                return false;
            }
            if (formData.waist_cm < 40 || formData.waist_cm > 200) {
                setError('Waist must be between 40 and 200 cm');
                return false;
            }
            if (formData.hip_cm < 40 || formData.hip_cm > 220) {
                setError('Hip must be between 40 and 220 cm');
                return false;
            }
        } else if (step === 4) {
            if (!formData.sbp_mmHg) {
                setError('Please enter systolic blood pressure');
                return false;
            }
            if (formData.sbp_mmHg < 70 || formData.sbp_mmHg > 260) {
                setError('SBP must be between 70 and 260 mmHg');
                return false;
            }
        }
        return true;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setError(null);
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep(4)) return;

        if (formData.sbp_mmHg >= 180 || formData.prior_cad) {
            setShowConfirm(true);
            return;
        }

        await submitAssessment();
    };

    const submitAssessment = async () => {
        setLoading(true);
        setError(null);

        try {
            const payload = {
                ...formData,
                age: parseInt(formData.age),
                height_cm: parseFloat(formData.height_cm),
                weight_kg: parseFloat(formData.weight_kg),
                waist_cm: parseFloat(formData.waist_cm),
                hip_cm: parseFloat(formData.hip_cm),
                sbp_mmHg: parseInt(formData.sbp_mmHg)
            };

            console.log('Submitting payload:', payload);

            const response = await axios.post(`${apiBaseUrl}/assessments`, payload);

            console.log('API Response:', response.data);

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
                        height_cm: parseFloat(formData.height_cm),
                        weight_kg: parseFloat(formData.weight_kg),
                        waist_cm: parseFloat(formData.waist_cm),
                        hip_cm: parseFloat(formData.hip_cm),
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
                backgroundColor: '#ffffff',
                width: reportElement.scrollWidth,
                height: reportElement.scrollHeight,
                windowWidth: reportElement.scrollWidth,
                windowHeight: reportElement.scrollHeight
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

    // PRINT FUNCTION with better design
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

            // Create print window
            const printWindow = window.open('', '_blank', 'width=900,height=700');
            
            if (!printWindow) {
                alert('Please allow pop-ups to print the report');
                setPrintLoading(false);
                return;
            }

            // Write content to print window with enhanced design
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>Predyx Assessment Report</title>
                        <style>
                            /* Reset and Base */
                            * {
                                margin: 0;
                                padding: 0;
                                box-sizing: border-box;
                            }
                            
                            body {
                                font-family: 'Segoe UI', Arial, sans-serif;
                                padding: 40px;
                                background: #f5f7fa;
                                color: #2c3e50;
                            }
                            
                            /* Main Container */
                            .print-container {
                                max-width: 1100px;
                                margin: 0 auto;
                                background: white;
                                padding: 50px;
                                border-radius: 12px;
                                box-shadow: 0 10px 40px rgba(0,0,0,0.1);
                            }
                            
                            /* Header */
                            .report-header {
                                text-align: center;
                                margin-bottom: 35px;
                                padding-bottom: 25px;
                                border-bottom: 3px solid #4CAF50;
                                position: relative;
                            }
                            
                            .report-header::after {
                                content: '';
                                position: absolute;
                                bottom: -3px;
                                left: 25%;
                                width: 50%;
                                height: 3px;
                                background: #2e7d32;
                            }
                            
                            .report-header h1 {
                                color: #1a237e;
                                font-size: 32px;
                                font-weight: 700;
                                margin-bottom: 12px;
                                letter-spacing: 1px;
                            }
                            
                            .report-header .subtitle {
                                color: #4CAF50;
                                font-size: 14px;
                                font-weight: 600;
                                text-transform: uppercase;
                                letter-spacing: 2px;
                                margin-bottom: 15px;
                            }
                            
                            .report-meta {
                                display: flex;
                                justify-content: center;
                                gap: 30px;
                                font-size: 13px;
                                color: #666;
                                flex-wrap: wrap;
                            }
                            
                            .report-meta span {
                                background: #f0f2f5;
                                padding: 6px 18px;
                                border-radius: 20px;
                                border: 1px solid #e0e0e0;
                            }
                            
                            /* Score Card */
                            .score-card {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                gap: 60px;
                                background: linear-gradient(135deg, #1a237e 0%, #283593 50%, #4CAF50 100%);
                                padding: 35px 50px;
                                border-radius: 16px;
                                margin-bottom: 35px;
                                color: white;
                                box-shadow: 0 8px 25px rgba(26, 35, 126, 0.3);
                            }
                            
                            .score-big {
                                text-align: center;
                            }
                            
                            .score-number {
                                font-size: 56px;
                                font-weight: 800;
                                line-height: 1;
                                text-shadow: 0 2px 10px rgba(0,0,0,0.2);
                            }
                            
                            .score-label {
                                font-size: 16px;
                                opacity: 0.9;
                                margin-top: 5px;
                                font-weight: 500;
                            }
                            
                            .score-divider {
                                width: 2px;
                                height: 60px;
                                background: rgba(255,255,255,0.3);
                            }
                            
                            .score-details {
                                display: flex;
                                flex-direction: column;
                                gap: 12px;
                            }
                            
                            .band {
                                padding: 10px 35px;
                                border-radius: 30px;
                                font-weight: 700;
                                font-size: 18px;
                                text-align: center;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                                background: rgba(255,255,255,0.25);
                                border: 2px solid rgba(255,255,255,0.5);
                            }
                            
                            .priority {
                                padding: 8px 30px;
                                border-radius: 30px;
                                font-weight: 600;
                                font-size: 16px;
                                text-align: center;
                                background: rgba(255,255,255,0.15);
                                border: 1px solid rgba(255,255,255,0.3);
                            }
                            
                            /* Warning Banner */
                            .warning-banner {
                                background: #fff3e0;
                                border-left: 5px solid #ff9800;
                                padding: 18px 25px;
                                border-radius: 8px;
                                margin-bottom: 30px;
                                color: #e65100;
                            }
                            
                            .warning-banner h4 {
                                font-size: 16px;
                                margin-bottom: 8px;
                            }
                            
                            .warning-banner p {
                                font-size: 14px;
                                margin: 3px 0;
                            }
                            
                            /* Result Grid */
                            .result-grid {
                                display: grid;
                                grid-template-columns: 1fr 1fr;
                                gap: 25px;
                                margin-bottom: 30px;
                            }
                            
                            .result-section {
                                background: #f8faff;
                                padding: 22px 25px;
                                border-radius: 12px;
                                border: 1px solid #e8ecf1;
                                transition: all 0.3s;
                            }
                            
                            .result-section:hover {
                                border-color: #4CAF50;
                            }
                            
                            .result-section h3 {
                                color: #1a237e;
                                margin-bottom: 15px;
                                font-size: 17px;
                                font-weight: 700;
                                border-bottom: 2px solid #4CAF50;
                                padding-bottom: 10px;
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            }
                            
                            .result-section.full-width {
                                grid-column: 1 / -1;
                            }
                            
                            /* Info Grid */
                            .info-grid {
                                display: grid;
                                grid-template-columns: 1fr 1fr;
                                gap: 8px 20px;
                            }
                            
                            .info-grid div {
                                padding: 6px 0;
                                font-size: 14px;
                                border-bottom: 1px dashed #f0f0f0;
                            }
                            
                            .info-grid div:last-child {
                                border-bottom: none;
                            }
                            
                            .info-grid strong {
                                color: #37474f;
                                font-weight: 600;
                            }
                            
                            /* Measurements Grid */
                            .measurements-grid {
                                display: grid;
                                grid-template-columns: 1fr 1fr 1fr;
                                gap: 8px 15px;
                            }
                            
                            .measurements-grid div {
                                padding: 6px 0;
                                font-size: 13px;
                                border-bottom: 1px dashed #f0f0f0;
                            }
                            
                            .measurements-grid strong {
                                color: #37474f;
                                font-weight: 600;
                            }
                            
                            /* Domain Grid */
                            .domain-grid {
                                display: grid;
                                grid-template-columns: 1fr 1fr;
                                gap: 10px;
                            }
                            
                            .domain-item {
                                display: flex;
                                justify-content: space-between;
                                padding: 10px 15px;
                                background: white;
                                border-radius: 8px;
                                border: 1px solid #e8ecf1;
                                font-size: 14px;
                            }
                            
                            .domain-value {
                                font-weight: 700;
                                color: #4CAF50;
                            }
                            
                            /* Drivers List */
                            .drivers-list {
                                display: flex;
                                flex-direction: column;
                                gap: 8px;
                            }
                            
                            .driver-item {
                                display: flex;
                                justify-content: space-between;
                                padding: 10px 15px;
                                background: white;
                                border-radius: 8px;
                                border: 1px solid #e8ecf1;
                                font-size: 14px;
                            }
                            
                            .driver-name {
                                font-weight: 500;
                            }
                            
                            .driver-points {
                                font-weight: 700;
                                color: #d32f2f;
                            }
                            
                            /* Interpretation */
                            .interpretation-text {
                                line-height: 1.8;
                                font-size: 14.5px;
                                padding: 15px 20px;
                                background: white;
                                border-radius: 8px;
                                border: 1px solid #e8ecf1;
                                color: #37474f;
                            }
                            
                            /* Recommendations */
                            .recommendations-list {
                                list-style: none;
                                padding: 0;
                            }
                            
                            .recommendations-list li {
                                padding: 12px 18px 12px 45px;
                                background: white;
                                margin-bottom: 8px;
                                border-radius: 8px;
                                border: 1px solid #e8ecf1;
                                position: relative;
                                font-size: 14px;
                            }
                            
                            .recommendations-list li:before {
                                content: "💡";
                                position: absolute;
                                left: 15px;
                                font-size: 18px;
                            }
                            
                            /* Footer */
                            .report-footer {
                                margin-top: 35px;
                                padding-top: 25px;
                                border-top: 2px solid #e8ecf1;
                                text-align: center;
                            }
                            
                            .report-footer .disclaimer {
                                font-size: 13px;
                                color: #666;
                                margin-bottom: 8px;
                                background: #f8f9fa;
                                padding: 10px;
                                border-radius: 8px;
                            }
                            
                            .report-footer .engine-info {
                                font-size: 12px;
                                color: #999;
                            }
                            
                            /* Badge */
                            .badge {
                                display: inline-block;
                                padding: 3px 12px;
                                border-radius: 12px;
                                font-size: 12px;
                                font-weight: 600;
                                background: #e8f5e9;
                                color: #2e7d32;
                            }
                            
                            /* Watermark */
                            .watermark {
                                position: fixed;
                                bottom: 20px;
                                right: 20px;
                                opacity: 0.05;
                                font-size: 60px;
                                font-weight: 900;
                                color: #1a237e;
                                pointer-events: none;
                                z-index: -1;
                            }
                            
                            /* Print Styles */
                            @media print {
                                body {
                                    background: white;
                                    padding: 15px;
                                }
                                
                                .print-container {
                                    box-shadow: none;
                                    padding: 30px;
                                    border-radius: 0;
                                }
                                
                                .result-section {
                                    break-inside: avoid;
                                    page-break-inside: avoid;
                                }
                                
                                .score-card {
                                    break-inside: avoid;
                                    page-break-inside: avoid;
                                }
                                
                                .result-grid {
                                    break-inside: avoid;
                                }
                            }
                            
                            /* Responsive */
                            @media (max-width: 768px) {
                                .result-grid {
                                    grid-template-columns: 1fr;
                                }
                                
                                .measurements-grid {
                                    grid-template-columns: 1fr 1fr;
                                }
                                
                                .info-grid {
                                    grid-template-columns: 1fr;
                                }
                                
                                .score-card {
                                    flex-direction: column;
                                    gap: 25px;
                                    padding: 25px;
                                }
                                
                                .score-divider {
                                    display: none;
                                }
                                
                                .report-meta {
                                    flex-direction: column;
                                    gap: 10px;
                                    align-items: center;
                                }
                                
                                .domain-grid {
                                    grid-template-columns: 1fr;
                                }
                                
                                body {
                                    padding: 15px;
                                }
                                
                                .print-container {
                                    padding: 20px;
                                }
                            }
                            
                            /* Print specific adjustments */
                            @media print {
                                .print-container {
                                    box-shadow: none !important;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="print-container">
                            ${printContent.innerHTML}
                            <div class="watermark">PREDYX</div>
                        </div>
                        <script>
                            window.onload = function() {
                                setTimeout(function() {
                                    window.print();
                                    setTimeout(function() {
                                        window.close();
                                    }, 1000);
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

    const resetForm = () => {
        setFormData({
            patient_name: '',
            age: '',
            sex: '',
            height_cm: '',
            weight_kg: '',
            waist_cm: '',
            hip_cm: '',
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
        setResult(null);
        setShowResult(false);
        setError(null);
        setWarnings([]);
        setCurrentStep(1);
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

                {/* Report Content - PDF generation */}
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

                    {/* Score Card */}
                    <div className="score-card">
                        <div className="score-big">
                            <div className="score-number">{result.predyx_pbs || 0}</div>
                            <div className="score-label">PBS Score</div>
                        </div>
                        <div className="score-divider"></div>
                        <div className="score-details">
                            <div className="band" style={{ 
                                background: getBandColor(result.risk_band),
                                color: 'white',
                            }}>
                                {result.risk_band || 'Unknown'}
                            </div>
                            <div className={`priority priority-${getPriorityColor(result.priority)}`}>
                                Priority: {result.priority || 'Unknown'}
                            </div>
                        </div>
                    </div>

                    <div className="result-grid">
                        {/* Patient Information */}
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

                        {/* Address */}
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

                        {/* Measurements */}
                        <div className="result-section">
                            <h3>📏 Measurements</h3>
                            <div className="measurements-grid">
                                <div><strong>Height:</strong> {rawInputs.height_cm || 'N/A'} cm</div>
                                <div><strong>Weight:</strong> {rawInputs.weight_kg || 'N/A'} kg</div>
                                <div><strong>BMI:</strong> {derived.bmi || 'N/A'} ({derived.bmi_category || 'N/A'})</div>
                                <div><strong>Waist:</strong> {rawInputs.waist_cm || 'N/A'} cm</div>
                                <div><strong>Hip:</strong> {rawInputs.hip_cm || 'N/A'} cm</div>
                                <div><strong>WHR:</strong> {derived.whr || 'N/A'}</div>
                                <div><strong>WHtR:</strong> {derived.whtr || 'N/A'} ({derived.whtr_category || 'N/A'})</div>
                                <div><strong>SBP:</strong> {rawInputs.sbp_mmHg || 'N/A'} mmHg</div>
                                <div><strong>Central Obesity:</strong> {derived.central_obesity ? 'Yes' : 'No'}</div>
                            </div>
                        </div>

                        {/* Domain Scores */}
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

                        {/* Top Risk Drivers */}
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

                    {/* Clinical Interpretation */}
                    <div className="result-section full-width">
                        <h3>💬 Clinical Interpretation</h3>
                        <p className="interpretation-text">{result.interpretation || 'No interpretation available'}</p>
                    </div>

                    {/* Recommendations */}
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

                    {/* Footer with disclaimer */}
                    <div className="report-footer">
                        <p className="disclaimer">⚠️ This is a screening report, not a diagnosis. Please consult your doctor for medical advice.</p>
                        <p className="engine-info">Engine: Predyx Quick v1.0 | Assessment ID: {result.assessment_code || result.assessment_id || 'N/A'}</p>
                    </div>
                </div>

                <div className="result-actions">
                    <button 
                        onClick={generatePDF} 
                        className="btn-pdf"
                        disabled={pdfLoading}
                    >
                        {pdfLoading ? '⏳ Generating PDF...' : '📥 Download PDF Report'}
                    </button>
                    <button 
                        onClick={handlePrint} 
                        className="btn-print"
                        disabled={printLoading}
                    >
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
                                </div>
                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="mobile_number"
                                        value={formData.mobile_number}
                                        onChange={handleInputChange}
                                        placeholder="Enter mobile number"
                                    />
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
                                </div>
                                <div className="form-group">
                                    <label>Age (years) *</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        placeholder="18-100"
                                        min="18"
                                        max="100"
                                    />
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
                                        placeholder="Enter pincode"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Anthropometry */}
                {currentStep === 3 && (
                    <div className="form-step">
                        <div className="form-section">
                            <h3>📏 Body Measurements</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Height (cm) *</label>
                                    <input
                                        type="number"
                                        name="height_cm"
                                        value={formData.height_cm}
                                        onChange={handleInputChange}
                                        placeholder="120-230"
                                        min="120"
                                        max="230"
                                        step="0.1"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Weight (kg) *</label>
                                    <input
                                        type="number"
                                        name="weight_kg"
                                        value={formData.weight_kg}
                                        onChange={handleInputChange}
                                        placeholder="25-250"
                                        min="25"
                                        max="250"
                                        step="0.1"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Waist (cm) *</label>
                                    <input
                                        type="number"
                                        name="waist_cm"
                                        value={formData.waist_cm}
                                        onChange={handleInputChange}
                                        placeholder="40-200"
                                        min="40"
                                        max="200"
                                        step="0.1"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Hip (cm) *</label>
                                    <input
                                        type="number"
                                        name="hip_cm"
                                        value={formData.hip_cm}
                                        onChange={handleInputChange}
                                        placeholder="40-220"
                                        min="40"
                                        max="220"
                                        step="0.1"
                                    />
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
                                        onChange={handleInputChange}
                                        placeholder="70-260"
                                        min="70"
                                        max="260"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>📋 Medical History</h3>
                            <div className="checkbox-grid">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="diabetes"
                                        checked={formData.diabetes === true}
                                        onChange={handleInputChange}
                                    />
                                    <span className="checkbox-text">Diabetes</span>
                                </label>
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="hypertension"
                                        checked={formData.hypertension === true}
                                        onChange={handleInputChange}
                                    />
                                    <span className="checkbox-text">Hypertension</span>
                                </label>
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="tobacco_use"
                                        checked={formData.tobacco_use === true}
                                        onChange={handleInputChange}
                                    />
                                    <span className="checkbox-text">Tobacco Use</span>
                                </label>
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="prior_cad"
                                        checked={formData.prior_cad === true}
                                        onChange={handleInputChange}
                                    />
                                    <span className="checkbox-text">Prior CAD</span>
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
                            <button onClick={submitAssessment} className="btn-confirm">
                                Yes, Proceed
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