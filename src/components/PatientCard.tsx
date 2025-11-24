import { useState, memo, useRef, useEffect } from 'react';
import type { Patient } from '../types/patient';
import { CaretDownIcon, PencilSimpleLineIcon } from '@phosphor-icons/react';

interface PatientCardProps {
  /** The patient data to display */
  patient: Patient;
  /** Optional callback function to open the edit modal for this patient */
  editPatient?: (patient: Patient) => void;
}

export const PatientCard = memo(({ patient, editPatient }: PatientCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const urlRef = useRef<HTMLAnchorElement>(null);
  const [nameTitle, setNameTitle] = useState<string | undefined>(undefined);
  const [urlTitle, setUrlTitle] = useState<string | undefined>(undefined);

  const showBlankAvatar = !patient.avatar || imageError;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Check if the name and website are overflowing and set the title attribute to the full text if they are
  useEffect(() => {
    const checkOverflow = () => {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        if (nameRef.current) {
          const isOverflowing = nameRef.current.scrollWidth > nameRef.current.clientWidth;
          setNameTitle(isOverflowing ? patient.name : undefined);
        }
        if (urlRef.current) {
          const isOverflowing = urlRef.current.scrollWidth > urlRef.current.clientWidth;
          setUrlTitle(isOverflowing ? patient.website : undefined);
        }
      });
    };
  
    // Initial check
    checkOverflow();
    
    // Add resize listener with debouncing for better performance
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkOverflow, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [patient.name, patient.website]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full">
      <div className="p-6">
        <div className="flex items-center gap-4">
          {showBlankAvatar ? (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <span className="text-gray-500 text-xl font-semibold">
                {patient.name.charAt(0).toUpperCase()}
              </span>
            </div>
          ) : (
            <img
              src={patient.avatar}
              alt={patient.name}
              className="w-16 h-16 rounded-full object-cover shrink-0"
              onError={() => {
                setImageError(true);
              }}
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 
              ref={nameRef}
              className="text-xl font-semibold text-gray-800 truncate w-full"
              title={nameTitle}
            >
              {patient.name}
            </h3>
            {patient.website && (
              <a
                ref={urlRef}
                href={patient.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm truncate block w-full"
                title={urlTitle}
              >
                {patient.website}
              </a>
            )}
          </div>
          <button
            onClick={toggleExpand}
            className="ml-2 p-2 rounded-full bg-white hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shrink-0"
            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
            aria-expanded={isExpanded}
          >
            <CaretDownIcon
              size={20}
              weight="bold"
              className={`text-gray-600 transition-transform duration-300 ease-in-out ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
        {patient.description && (
          <div
            className={
              isExpanded ? 'description-expand' : 'description-collapse'
            }
          >
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
              {patient.description}
            </p>
          </div>
        )}
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Created: {new Date(patient.createdAt).toLocaleDateString()}
          </p>
          {editPatient && (
            <button
              onClick={() => editPatient(patient)}
              className="flex justify-between gap-2 px-3 py-1.5 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Edit patient"
            >
              <PencilSimpleLineIcon size={20} weight="bold" />
              <span className="text-sm">Edit</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
});
