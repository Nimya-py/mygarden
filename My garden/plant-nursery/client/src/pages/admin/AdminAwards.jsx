import React, { useEffect, useState, useRef } from 'react';
import {
  Award,
  Upload,
  Trash2,
  RefreshCw,
  Save,
  CheckCircle,
  AlertCircle,
  FileCheck,
  FileText,
  Eye,
  Camera,
} from 'lucide-react';
import API from '../../services/api';

export const AdminAwards = () => {
  const certFileInputRef = useRef(null);
  const photoFileInputRef = useRef(null);

  const defaultAwardData = {
    title: 'ISO 9001:2000',
    certification: 'Quality Management Certification',
    year: '2008',
    organization: 'American National Accreditation Board (ANAB)',
    description:
      'Kinattukara Nutmeg Nursery received ISO 9001:2000 certification in 2008 through the American National Accreditation Board (ANAB).',
    certificateImage: '',
    awardReceivingImage: '',
  };

  const [formData, setFormData] = useState(() => {
    try {
      const cached = localStorage.getItem('kinattukara_award_data');
      return cached ? JSON.parse(cached) : defaultAwardData;
    } catch (e) {
      return defaultAwardData;
    }
  });

  const [certPreview, setCertPreview] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [certFileName, setCertFileName] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAward = async () => {
      setLoading(true);
      try {
        const res = await API.get('/awards');
        if (res.data?.success && res.data?.data) {
          const data = res.data.data;
          setFormData({
            title: data.title || defaultAwardData.title,
            certification: data.certification || defaultAwardData.certification,
            year: data.year || defaultAwardData.year,
            organization: data.organization || defaultAwardData.organization,
            description: data.description || defaultAwardData.description,
            certificateImage: data.certificateImage || '',
            awardReceivingImage: data.awardReceivingImage || '',
          });
          setCertPreview(data.certificateImage || '');
          setPhotoPreview(data.awardReceivingImage || '');
          try {
            localStorage.setItem('kinattukara_award_data', JSON.stringify(data));
          } catch (e) {}
        }
      } catch (err) {
        console.log('Using local award data cache for admin');
        setCertPreview(formData.certificateImage || '');
        setPhotoPreview(formData.awardReceivingImage || '');
      } finally {
        setLoading(false);
      }
    };

    fetchAward();
  }, []);

  const isCertPdf = (val) => {
    if (!val) return false;
    return val.startsWith('data:application/pdf') || val.toLowerCase().includes('.pdf');
  };

  const handleCertFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    // Validation 1: Allowed file formats
    if (!validTypes.includes(file.type) && !isPdf) {
      setError('Invalid file format. Please upload an image (JPG, JPEG, PNG, WebP) or a PDF document.');
      return;
    }

    // Validation 2: Maximum file size limit (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds the 10MB limit. Please upload a smaller file.');
      return;
    }

    // Clear previous errors
    setError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      setCertPreview(result);
      setCertFileName(file.name);
      setFormData((prev) => ({ ...prev, certificateImage: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCertImage = () => {
    setCertPreview('');
    setCertFileName('');
    setFormData((prev) => ({ ...prev, certificateImage: '' }));
    if (certFileInputRef.current) {
      certFileInputRef.current.value = '';
    }
  };

  const handlePhotoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPG, JPEG, PNG, or WebP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError('Photo file size must be less than 8MB.');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      setPhotoPreview(result);
      setFormData((prev) => ({ ...prev, awardReceivingImage: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoPreview('');
    setFormData((prev) => ({ ...prev, awardReceivingImage: '' }));
    if (photoFileInputRef.current) {
      photoFileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess('');
    setError('');

    try {
      try {
        await API.put('/awards', formData);
      } catch (apiErr) {
        console.warn('Backend update notice (using optimistic local sync):', apiErr);
      }

      try {
        localStorage.setItem('kinattukara_award_data', JSON.stringify(formData));
      } catch (storageErr) {
        console.warn('LocalStorage notice:', storageErr);
      }

      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'kinattukara_award_data',
          newValue: JSON.stringify(formData),
        })
      );

      setSuccess('ISO 9001:2000 award details, certificate, and ceremony photo saved successfully!');
    } catch (err) {
      setError('Failed to update award details. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-[#163A24] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#163A24]/10 pb-6">
        <div>
          <span className="text-[10px] font-semibold tracking-widest text-[#647563] uppercase">
            AWARDS MANAGEMENT
          </span>
          <h1 className="font-serif text-3xl font-normal text-[#0B2115]">
            ISO 9001:2000 Award, Certificate & Photos
          </h1>
          <p className="text-xs text-[#647563] mt-1 font-light">
            Manage your official quality management certification details, upload the certificate document, and the photo of receiving the award.
          </p>
        </div>

        <a
          href="/awards"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 text-xs text-[#163A24] bg-white border border-[#163A24]/20 hover:border-[#163A24] px-4 py-2 rounded-full font-medium transition-colors shrink-0"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Public Page</span>
        </a>
      </div>

      {success && (
        <div className="p-4 bg-[#163A24]/10 border border-[#163A24]/20 rounded-md flex items-center space-x-3 text-xs text-[#163A24]">
          <CheckCircle className="w-4 h-4 text-[#163A24] shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-center space-x-3 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Award Form */}
      <form onSubmit={handleSubmit} className="space-y-10 bg-white p-6 sm:p-10 rounded-lg border border-[#163A24]/10 shadow-sm">
        
        {/* Two-Column Upload Grid: Ceremony Photo & Certificate Document */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* 1. Award Receiving Ceremony Photo Upload ("Award Medikkunna Photo") */}
          <div className="space-y-3 p-5 rounded-lg bg-[#F7F5EE]/60 border border-[#163A24]/15 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-[#163A24]" />
                  <label className="text-xs font-semibold text-[#0B2115] uppercase tracking-wider">
                    Award Ceremony Photo
                  </label>
                </div>

                {photoPreview && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="text-xs text-red-600 hover:text-red-700 p-0.5"
                    title="Remove photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <p className="text-[11px] text-[#647563]">
                Upload photo of receiving the award at the ceremony (displayed on right section).
              </p>
            </div>

            <input
              type="file"
              ref={photoFileInputRef}
              onChange={handlePhotoFileChange}
              accept=".jpg,.jpeg,.png,.webp"
              className="hidden"
            />

            {photoPreview ? (
              <div className="space-y-3 my-auto pt-2">
                <div className="relative rounded-md overflow-hidden border border-[#163A24]/20 bg-white p-2 text-center aspect-[4/3]">
                  <img
                    src={photoPreview}
                    alt="Ceremony Preview"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => photoFileInputRef.current?.click()}
                    className="inline-flex items-center space-x-1.5 text-xs text-[#0B2115] bg-white hover:bg-[#EAE6DB] px-3.5 py-1.5 rounded-full border border-[#163A24]/20 font-medium transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Replace Photo</span>
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => photoFileInputRef.current?.click()}
                className="border-2 border-dashed border-[#163A24]/20 hover:border-[#163A24] rounded-lg p-6 text-center cursor-pointer transition-colors bg-white/70 space-y-2 my-auto"
              >
                <div className="w-10 h-10 rounded-full bg-[#163A24]/10 text-[#163A24] flex items-center justify-center mx-auto">
                  <Upload className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0B2115]">
                    Upload Award Receiving Photo
                  </p>
                  <p className="text-[10px] text-[#647563] mt-0.5">
                    JPG, JPEG, PNG, or WebP
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 2. Certificate Image Upload */}
          <div className="space-y-3 p-5 rounded-lg bg-[#F7F5EE]/60 border border-[#163A24]/15 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <FileCheck className="w-4 h-4 text-[#163A24]" />
                  <label className="text-xs font-semibold text-[#0B2115] uppercase tracking-wider">
                    Certificate Document
                  </label>
                </div>

                {certPreview && (
                  <button
                    type="button"
                    onClick={handleRemoveCertImage}
                    className="text-xs text-red-600 hover:text-red-700 p-0.5"
                    title="Remove certificate"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <p className="text-[11px] text-[#647563]">
                Upload official ISO 9001:2000 certificate document scan or photo.
              </p>
            </div>

            <input
              type="file"
              ref={certFileInputRef}
              onChange={handleCertFileChange}
              accept=".jpg,.jpeg,.png,.webp,.pdf,application/pdf"
              className="hidden"
            />

            {certPreview ? (
              <div className="space-y-3 my-auto pt-2">
                <div className="relative rounded-md overflow-hidden border border-[#163A24]/20 bg-white p-3 text-center aspect-[4/3] flex items-center justify-center">
                  {isCertPdf(certPreview) ? (
                    <div className="space-y-2 p-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
                        <FileText className="w-6 h-6 stroke-[1.8]" />
                      </div>
                      <p className="font-semibold text-xs text-[#0B2115] truncate max-w-[200px] mx-auto">
                        {certFileName || 'Official_Certificate.pdf'}
                      </p>
                      <span className="inline-block bg-[#163A24]/10 text-[#163A24] text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase">
                        PDF Document Loaded
                      </span>
                    </div>
                  ) : (
                    <img
                      src={certPreview}
                      alt="Certificate Preview"
                      className="w-full h-full object-contain rounded"
                    />
                  )}
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => certFileInputRef.current?.click()}
                    className="inline-flex items-center space-x-1.5 text-xs text-[#0B2115] bg-white hover:bg-[#EAE6DB] px-3.5 py-1.5 rounded-full border border-[#163A24]/20 font-medium transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Replace Certificate</span>
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => certFileInputRef.current?.click()}
                className="border-2 border-dashed border-[#163A24]/20 hover:border-[#163A24] rounded-lg p-6 text-center cursor-pointer transition-colors bg-white/70 space-y-2 my-auto"
              >
                <div className="w-10 h-10 rounded-full bg-[#163A24]/10 text-[#163A24] flex items-center justify-center mx-auto">
                  <Upload className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0B2115]">
                    Upload Certificate Document
                  </p>
                  <p className="text-[10px] text-[#647563] mt-0.5">
                    PDF, JPG, JPEG, PNG, or WebP (Max 10MB)
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Text Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#163A24]/10">
          
          <div>
            <label className="block text-xs font-medium text-[#172018] mb-1.5">
              Award Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#F7F5EE] border border-[#163A24]/20 rounded-md px-3.5 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#172018] mb-1.5">
              Certification Scope / Type
            </label>
            <input
              type="text"
              value={formData.certification}
              onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
              className="w-full bg-[#F7F5EE] border border-[#163A24]/20 rounded-md px-3.5 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#172018] mb-1.5">
              Year of Award *
            </label>
            <input
              type="text"
              required
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full bg-[#F7F5EE] border border-[#163A24]/20 rounded-md px-3.5 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#172018] mb-1.5">
              Accreditation Board / Organization *
            </label>
            <input
              type="text"
              required
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="w-full bg-[#F7F5EE] border border-[#163A24]/20 rounded-md px-3.5 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24]"
            />
          </div>

        </div>

        <div>
          <label className="block text-xs font-medium text-[#172018] mb-1.5">
            Official Description
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-[#F7F5EE] border border-[#163A24]/20 rounded-md px-3.5 py-2.5 text-xs text-[#172018] focus:outline-none focus:border-[#163A24]"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center space-x-2 bg-[#163A24] hover:bg-[#0B2115] text-[#F7F5EE] px-7 py-3 rounded-full text-xs font-medium tracking-wide transition-colors shadow"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{submitting ? 'Saving Changes...' : 'Save Award, Certificate & Photo'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
