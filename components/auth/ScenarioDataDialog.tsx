'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';

// Add global styles for custom scrollbars and time picker
const globalStyles = `
  .custom-scrollbar {
    scrollbar-width: thin; /* For Firefox */
    -ms-overflow-style: none; /* For Internet Explorer and Edge */
    scrollbar-color: rgba(100, 100, 100, 0) transparent; /* For Firefox - thumb and track colors */
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(100, 100, 100, 0.05);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(5px);
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(120, 120, 120, 0);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  /* Hide scrollbar for Chrome, Safari and Opera but maintain functionality */
  .transparent-scrollbar {
    scrollbar-width: thin; /* For Firefox */
    -ms-overflow-style: none; /* For Internet Explorer and Edge */
    scrollbar-color: rgba(100, 100, 100, 0) transparent; /* For Firefox - thumb and track colors */
  }
  
  .transparent-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  .transparent-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }
  
  .transparent-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(100, 100, 100, 0.05);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(5px);
  }
  
  .transparent-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(120, 120, 120, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .historical-data-container {
    max-height: 70vh;
    overflow-y: auto;
    padding-right: 5px;
  }
  
  .custom-time-picker .hidden {
    display: none;
  }
  
  /* Responsive styles for different screen sizes */
  @media (max-width: 640px) {
    .custom-calendar-popup, #time-dropdown, #calendar-dropdown {
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important;
      width: 90% !important;
      max-width: 350px !important;
      z-index: 50 !important;
    }
    
    .dialog-content {
      width: 95% !important;
      padding: 1rem !important;
    }
    
    .time-buttons {
      flex-direction: column !important;
    }
    
    .time-buttons button {
      margin-bottom: 0.5rem !important;
    }
  }
  
  @media (max-width: 480px) {
    .custom-calendar-popup, #time-dropdown, #calendar-dropdown {
      max-width: 300px !important;
    }
    
    .dialog-content {
      padding: 0.75rem !important;
    }
  }
`;

interface ScenarioDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDataSelection: (useHistorical: boolean, expiry?: string, date?: string, time?: string) => void;
}

export function ScenarioDataDialog({ 
  open, 
  onOpenChange,
  onDataSelection
}: ScenarioDataDialogProps) {
  const { user } = useAuth();
  
  // State for historical data form
  const [showHistoricalForm, setShowHistoricalForm] = useState(false);
  const [expiry, setExpiry] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [expiryOptions, setExpiryOptions] = useState<string[]>([]);
  
  // Add global styles to the document
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = globalStyles;
    document.head.appendChild(styleElement);
    
    // Cleanup function to remove styles when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  // Process expiry dates based on current date
  useEffect(() => {
    const processExpiryDates = () => {
      // Get current date
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();
      
      // New expiry dates in DD-MM-YYYY format
      const newExpiryDates = [
        "24-12-2025", "25-09-2025", "28-08-2025", "07-08-2025", "31-07-2025", 
        "24-07-2025", "17-07-2025", "10-07-2025", "03-07-2025", "26-06-2025", 
        "19-06-2025", "12-06-2025", "05-06-2025", "29-05-2025", "22-05-2025", 
        "15-05-2025", "08-05-2025", "30-04-2025", "24-04-2025", "17-04-2025", 
        "09-04-2025", "03-04-2025", "27-03-2025", "20-03-2025", "13-03-2025", 
        "06-03-2025", "27-02-2025", "20-02-2025", "13-02-2025", "06-02-2025", 
        "30-01-2025", "23-01-2025", "16-01-2025", "09-01-2025", "02-01-2025"
      ];
      
      // Find the upcoming Thursday
      const getUpcomingThursday = () => {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 = Sunday, 4 = Thursday
        const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
        const upcomingThursday = new Date(today);
        upcomingThursday.setDate(today.getDate() + daysUntilThursday);
        return upcomingThursday;
      };
      
      const upcomingThursday = getUpcomingThursday();
      
      // Filter out future dates and dates after the upcoming Thursday
      const filteredExpiryDates = newExpiryDates.filter(dateStr => {
        const [day, month, year] = dateStr.split('-').map(part => parseInt(part));
        const expiryDate = new Date(year, month - 1, day);
        return expiryDate <= upcomingThursday;
      });
      
      // Keep the original DD-MM-YYYY format for both internal use and display
      return filteredExpiryDates;
    };
    
    setExpiryOptions(processExpiryDates());
  }, []);
  
  // Handle live data selection
  const handleLiveDataSelection = () => {
    onDataSelection(false);
    onOpenChange(false);
  };
  
  // Handle historical data form submission
  const handleHistoricalDataSubmit = () => {
    // Validate inputs
    if (!expiry) {
      setError('Expiry is required');
      return;
    }

    if (!date) {
      setError('Date is required');
      return;
    }

    if (!time) {
      setError('Time is required');
      return;
    }
    
    // Adjust the date to be one day after the selected date
    const adjustedDate = new Date(date);
    adjustedDate.setDate(adjustedDate.getDate() + 1);
    const adjustedDateStr = adjustedDate.toISOString().split('T')[0];
    
    // Call the callback with the form data - expiry is already in DD-MM-YYYY format
    onDataSelection(true, expiry, adjustedDateStr, time);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-950 border border-neutral-800 text-neutral-100 p-6 max-w-md mx-auto dialog-content transparent-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-neutral-100 flex items-center">
            <span className="mr-2">📈</span> Market Data Selection
          </DialogTitle>
          <DialogDescription className="text-neutral-400 mt-2">
            Select whether to use real-time market data or historical market data for your trading scenario analysis.
          </DialogDescription>
          {!showHistoricalForm ? (
            <div className="mt-3 flex gap-2">
              <div className="h-1 flex-1 bg-green-900 rounded-full"></div>
              <div className="h-1 flex-1 bg-neutral-800 rounded-full"></div>
            </div>
          ) : (
            <div className="mt-3 flex gap-2">
              <div className="h-1 flex-1 bg-neutral-800 rounded-full"></div>
              <div className="h-1 flex-1 bg-orange-900 rounded-full"></div>
            </div>
          )}
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-800 rounded-md text-red-400 text-sm">
              {error}
            </div>
          )}

          {!showHistoricalForm ? (
            <div className="flex flex-col space-y-4">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white py-6"
                onClick={handleLiveDataSelection}
              >
                Use Live Market Data
              </Button>
              
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500/10 py-6"
                onClick={() => setShowHistoricalForm(true)}
              >
                Use Historical Data
              </Button>
            </div>
          ) : (
            <div className="space-y-4 historical-data-container transparent-scrollbar">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium text-neutral-400">Expiry</div>
                  <div className="text-xs text-neutral-500 flex items-center gap-1">
                    <span className="inline-flex items-center"><span className="w-2 h-2 inline-block bg-yellow-500 rounded-full mr-1"></span>Quarterly</span>
                    <span className="inline-flex items-center ml-2"><span className="w-2 h-2 inline-block bg-green-500 rounded-full mr-1"></span>Monthly</span>
                  </div>
                </div>
                <div className="relative">
                  <select
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-neutral-100 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm sm:text-base appearance-none shadow-lg shadow-orange-900/10 transparent-scrollbar"
                    style={{ fontFamily: 'monospace' }}
                  >
                    <option value="" className="bg-black text-neutral-400">Select an expiry date</option>
                    {expiryOptions.map((option) => {
                      // Parse the option string to get day, month, and year
                      const [day, month, year] = option.split('-');
                      
                      // Get the day of week
                      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                      const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
                      
                      // The option is already in DD-MM-YYYY format
                      const formattedDate = option;
                      
                      // Determine if it's a monthly expiry (last Thursday of month)
                      const isLastThursday = (() => {
                        const monthNumber = parseInt(month);
                        const lastDay = new Date(parseInt(year), monthNumber, 0).getDate();
                        const lastThursday = new Date(parseInt(year), monthNumber - 1, lastDay);
                        while (lastThursday.getDay() !== 4) { // 4 is Thursday
                          lastThursday.setDate(lastThursday.getDate() - 1);
                        }
                        return parseInt(day) === lastThursday.getDate();
                      })();
                      
                      // Determine if it's a quarterly expiry (last Thursday of Mar, Jun, Sep, Dec)
                      const isQuarterlyExpiry = isLastThursday && [3, 6, 9, 12].includes(parseInt(month));
                      
                      // Create display text with market indicators - use dd-mm-yyyy format
                      let displayText = formattedDate;
                      
                      // Add day of week and market indicators with special styling
                      const dayAbbr = dayOfWeek.substring(0, 3);
                      
                      // Create styled option content
                      return (
                        <option 
                          key={option} 
                          value={option}
                          className={`bg-black ${isQuarterlyExpiry ? 'text-yellow-400 font-bold' : (isLastThursday ? 'text-green-400 font-semibold' : 'text-neutral-300')}`}
                        >
                          {displayText} • {dayAbbr} {isQuarterlyExpiry ? '📊Q' : (isLastThursday ? '📅M' : '')}
                        </option>
                      );
                    })}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 p-2 bg-neutral-900/50 border border-neutral-800 rounded-md">
                  <div className="text-xs text-neutral-400 mb-1 font-medium">Stock Market Calendar Legend</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-yellow-500/20 text-yellow-500 rounded-full font-bold">Q</span>
                      <span className="text-neutral-300">Quarterly Expiry</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-green-500/20 text-green-500 rounded-full font-bold">M</span>
                      <span className="text-neutral-300">Monthly Expiry</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-white/10 text-white rounded-full font-bold">T</span>
                      <span className="text-neutral-300">Thursday</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-500/20 text-blue-300 rounded-full font-bold">F</span>
                      <span className="text-neutral-300">Friday</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium text-neutral-400 flex items-center gap-1">
                    <svg className="h-4 w-4 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span>Trading Date</span>
                  </div>
                  <div className="text-xs text-neutral-500 bg-neutral-800/50 px-2 py-1 rounded-full">NSE Calendar</div>
                </div>
                <div className="relative custom-date-picker">
                  <input
                    type="text"
                    value={date ? (() => {
                      // Add one day to the selected date
                      const selectedDate = new Date(date);
                      selectedDate.setDate(selectedDate.getDate() + 1);
                      return selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
                    })() : ''}
                    placeholder="DD-MM-YYYY"
                    readOnly
                    onClick={() => document.getElementById('calendar-dropdown')?.classList.toggle('hidden')}
                    className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-neutral-100 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm sm:text-base cursor-pointer shadow-lg shadow-orange-900/10"
                    style={{ fontFamily: 'monospace' }}
                  />
                  <input
                    type="date"
                    id="hidden-date-input"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      document.getElementById('calendar-dropdown')?.classList.add('hidden');
                    }}
                    className="hidden"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer" onClick={() => document.getElementById('calendar-dropdown')?.classList.toggle('hidden')}>
                    <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  {/* Custom Calendar Dropdown */}
                  <div id="calendar-dropdown" className="hidden absolute z-10 mt-1 w-full bg-black rounded-md shadow-lg overflow-hidden border border-neutral-700 custom-calendar-popup transparent-scrollbar">
                    <div className="p-2 bg-black border-b border-neutral-700">
                      <div className="flex justify-between items-center text-neutral-200">
                        <button 
                          className="p-1 hover:bg-neutral-700 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            const currentDate = date ? new Date(date) : new Date();
                            currentDate.setMonth(currentDate.getMonth() - 1);
                            setDate(currentDate.toISOString().split('T')[0]);
                          }}
                        >
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        
                        <div className="font-medium">
                          {date ? new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </div>
                        
                        <button 
                          className="p-1 hover:bg-neutral-700 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            const currentDate = date ? new Date(date) : new Date();
                            currentDate.setMonth(currentDate.getMonth() + 1);
                            setDate(currentDate.toISOString().split('T')[0]);
                          }}
                        >
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-2 bg-black">
                      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-neutral-500">
                        <div>Su</div>
                        <div>Mo</div>
                        <div>Tu</div>
                        <div>We</div>
                        <div className="text-blue-400">Th</div>
                        <div className="text-blue-400">Fr</div>
                        <div>Sa</div>
                      </div>
                      
                      <div className="grid grid-cols-7 gap-1 mt-1">
                        {(() => {
                          const currentDate = date ? new Date(date) : new Date();
                          const year = currentDate.getFullYear();
                          const month = currentDate.getMonth();
                          const today = new Date();
                          
                          // First day of the month
                          const firstDay = new Date(year, month, 1);
                          const startingDay = firstDay.getDay(); // 0 = Sunday
                          
                          // Last day of the month
                          const lastDay = new Date(year, month + 1, 0).getDate();
                          
                          // Generate calendar days
                          const days = [];
                          
                          // Add empty cells for days before the first day of the month
                          for (let i = 0; i < startingDay; i++) {
                            const prevMonthLastDay = new Date(year, month, 0).getDate();
                            const day = prevMonthLastDay - startingDay + i + 1;
                            days.push(
                              <div 
                                key={`prev-${i}`} 
                                className="h-8 w-8 flex items-center justify-center text-xs text-neutral-700"
                              >
                                {day}
                              </div>
                            );
                          }
                          
                          // Define holidays for 2025
                          const holidays2025 = [
                            "2025-02-26", // Mahashivratri
                            "2025-03-14", // Holi
                            "2025-03-31", // Eid-Ul-Fitr
                            "2025-04-10", // Shri Mahavir Jayanti
                            "2025-04-14", // Dr. Baba Saheb Ambedkar Jayanti
                            "2025-04-18", // Good Friday
                            "2025-05-01", // Maharashtra Day
                            "2025-08-15", // Independence Day
                            "2025-08-27", // Ganesh Chaturthi
                            "2025-10-02", // Mahatma Gandhi Jayanti/Dussehra
                            "2025-10-21", // Diwali Laxmi Pujan
                            "2025-10-22", // Diwali-Balipratipada
                            "2025-11-05", // Prakash Gurpurb Sri Guru Nanak Dev
                            "2025-12-25", // Christmas
                          ];
                          
                          // Add cells for each day of the month
                          for (let i = 1; i <= lastDay; i++) {
                            const dayDate = new Date(year, month, i);
                            const dateString = dayDate.toISOString().split('T')[0];
                            const isToday = today.toDateString() === dayDate.toDateString();
                            const isSelected = date === dateString;
                            const dayOfWeek = dayDate.getDay();
                            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Saturday or Sunday
                            const isHoliday = holidays2025.includes(dateString);
                            const isThursday = dayOfWeek === 4; // Thursday
                            const isFriday = dayOfWeek === 5; // Friday
                            const isFutureDate = dayDate > today;
                            
                            // Check if it's a monthly expiry (last Thursday of month)
                            const isLastThursday = (() => {
                              if (dayDate.getDay() !== 4) return false; // Not Thursday
                              const nextWeek = new Date(year, month, i + 7);
                              return nextWeek.getMonth() !== month;
                            })();
                            
                            // Check if it's a quarterly expiry
                            const isQuarterlyExpiry = isLastThursday && [2, 5, 8, 11].includes(month); // Mar, Jun, Sep, Dec (0-indexed)
                            
                            // Find the upcoming Thursday
                            const getUpcomingThursday = () => {
                              const today = new Date();
                              const dayOfWeek = today.getDay(); // 0 = Sunday, 4 = Thursday
                              const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
                              const upcomingThursday = new Date(today);
                              upcomingThursday.setDate(today.getDate() + daysUntilThursday);
                              return upcomingThursday;
                            };
                            
                            const upcomingThursday = getUpcomingThursday();
                            const isAfterUpcomingThursday = dayDate > upcomingThursday;
                            
                            // Determine if the day is selectable (not a weekend, holiday, future date, or after upcoming Thursday)
                            const isSelectable = !isWeekend && !isHoliday && !isFutureDate && !isAfterUpcomingThursday;
                            
                            let className = "h-8 w-8 flex items-center justify-center text-xs rounded-full relative ";
                            
                            if (isSelected) {
                              className += "bg-orange-500 text-white font-bold ";
                            } else if (isToday) {
                              className += "border border-orange-500 text-orange-400 ";
                            } else if (isFutureDate) {
                              className += "text-neutral-600 bg-neutral-900/50 ";
                            } else if (isQuarterlyExpiry) {
                              className += "bg-yellow-900/30 text-yellow-400 border border-yellow-800/30 font-bold ";
                            } else if (isLastThursday) {
                              className += "bg-green-900/30 text-green-400 border border-green-800/30 font-semibold ";
                            } else if (isThursday) {
                              className += "text-blue-400 font-medium ";
                            } else if (isFriday) {
                              className += "text-blue-400 ";
                            } else if (isHoliday) {
                              className += "text-red-400 bg-red-900/20 border border-red-800/30 ";
                            } else if (isWeekend) {
                              className += "text-neutral-600 ";
                            } else {
                              className += "text-neutral-300 hover:bg-neutral-800 ";
                            }
                            
                            // Add cursor-pointer only if the day is selectable
                            className += isSelectable ? "cursor-pointer" : "cursor-not-allowed";
                            
                            days.push(
                              <div 
                                key={i} 
                                className={className}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Only set date if the day is selectable
                                  if (isSelectable) {
                                    const newDate = new Date(year, month, i);
                                    setDate(newDate.toISOString().split('T')[0]);
                                    document.getElementById('calendar-dropdown')?.classList.add('hidden');
                                  }
                                }}
                              >
                                {i}
                                {isQuarterlyExpiry && <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>}
                                {isLastThursday && !isQuarterlyExpiry && <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-green-500 rounded-full"></span>}
                                {isHoliday && <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full"></span>}
                                {isFutureDate && <span className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-neutral-500 rounded-full"></span>}
                              </div>
                            );
                          }
                          
                          // Add empty cells for days after the last day of the month
                          const totalCells = Math.ceil((startingDay + lastDay) / 7) * 7;
                          for (let i = lastDay + startingDay; i < totalCells; i++) {
                            const day = i - lastDay - startingDay + 1;
                            days.push(
                              <div 
                                key={`next-${i}`} 
                                className="h-8 w-8 flex items-center justify-center text-xs text-neutral-700"
                              >
                                {day}
                              </div>
                            );
                          }
                          
                          return days;
                        })()} 
                      </div>
                    </div>
                    
                    <div className="p-2 bg-black border-t border-neutral-700 flex justify-between items-center">
                      <button 
                        className="text-xs text-blue-400 hover:text-blue-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          document.getElementById('calendar-dropdown')?.classList.add('hidden');
                        }}
                      >
                        Close
                      </button>
                      <button 
                        className="text-xs bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          const today = new Date();
                          setDate(today.toISOString().split('T')[0]);
                        }}
                      >
                        Today
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-neutral-500 mt-1 flex justify-between">
                  <div>
                    <span>Format: DD-MM-YYYY</span>
                    <span className="ml-2 bg-green-900/30 text-green-400 px-1.5 py-0.5 rounded-full text-[10px]"></span>
                  </div>
                  <span className="text-orange-400 cursor-pointer" onClick={() => {
                    const today = new Date();
                    setDate(today.toISOString().split('T')[0]);
                  }}>Today</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium text-neutral-400 flex items-center gap-1">
                    <svg className="h-4 w-4 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>Trading Time</span>
                  </div>
                  <div className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded-full flex items-center gap-1">
                    <span className="w-2 h-2 inline-block bg-blue-500 rounded-full"></span>
                    <span>Market: 9:15-15:30</span>
                  </div>
                </div>
                <div className="relative custom-time-picker">
                  <input
                    type="text"
                    value={time ? time : ""}
                    placeholder="HH:MM:SS"
                    readOnly
                    onClick={() => document.getElementById('time-dropdown')?.classList.toggle('hidden')}
                    className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm sm:text-base cursor-pointer shadow-lg shadow-orange-900/10 font-mono font-medium"
                  />
                  {/* Removed overlapping colored time display */}
                  <input
                    type="time"
                    id="hidden-time-input"
                    value={time}
                    onChange={(e) => {
                      setTime(e.target.value);
                      document.getElementById('time-dropdown')?.classList.add('hidden');
                    }}
                    className="hidden"
                    step="1"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer" onClick={() => document.getElementById('time-dropdown')?.classList.toggle('hidden')}>
                    <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  {/* Custom Time Dropdown with Simplified Interface */}
                  <div id="time-dropdown" className="hidden absolute z-10 mt-1 w-full bg-black rounded-md shadow-lg overflow-hidden border border-neutral-700 transparent-scrollbar">
                    <div className="p-2 bg-black border-b border-neutral-700">
                      <div className="text-center text-neutral-200 font-medium">
                        Select Trading Time
                      </div>
                    </div>
                    
                    <div className="p-3 bg-black">
                      {/* Simple Time Input */}
                      <div className="flex flex-col space-y-3">
                        <div className="text-sm text-neutral-300 mb-1">Select Time (24-hour format)</div>
                        <input
                          type="time"
                          step="1"
                          className="bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-lg"
                          value={time || '09:15:00'}
                          onChange={(e) => {
                            // Ensure seconds are included
                            let newTime = e.target.value;
                            if (newTime.split(':').length === 2) {
                              newTime = `${newTime}:00`;
                            }
                            setTime(newTime);
                            // Hide dropdown after selection
                            document.getElementById('time-dropdown')?.classList.add('hidden');
                          }}
                        />
                      </div>
                      
                      {/* Quick Market Times */}
                      <div className="mt-4 pt-3 border-t border-neutral-700">
                        <div className="text-xs text-neutral-400 mb-2 text-center">Quick Market Times</div>
                        <div className="grid grid-cols-2 gap-2 time-buttons">
                          <button 
                            className="bg-blue-900/30 text-blue-400 px-2 py-2 rounded text-sm font-medium hover:bg-blue-800/40 flex items-center justify-center border border-blue-800/50 transition-all duration-200 transform hover:scale-105"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTime('09:15:00');
                              document.getElementById('time-dropdown')?.classList.add('hidden');
                            }}
                          >
                            <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0V5z" clipRule="evenodd" />
                            </svg>
                            Market Open (9:15)
                          </button>
                          <button 
                            className="bg-orange-900/30 text-orange-400 px-2 py-2 rounded text-sm font-medium hover:bg-orange-800/40 flex items-center justify-center border border-orange-800/50 transition-all duration-200 transform hover:scale-105"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTime('15:30:00');
                              document.getElementById('time-dropdown')?.classList.add('hidden');
                            }}
                          >
                            <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0V5z" clipRule="evenodd" />
                            </svg>
                            Market Close (15:30)
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <button 
                            className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs font-medium hover:bg-green-800/40 flex items-center justify-center border border-green-800/50 transition-all duration-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTime('10:00:00');
                              document.getElementById('time-dropdown')?.classList.add('hidden');
                            }}
                          >
                            10:00 AM
                          </button>
                          <button 
                            className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs font-medium hover:bg-green-800/40 flex items-center justify-center border border-green-800/50 transition-all duration-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTime('12:00:00');
                              document.getElementById('time-dropdown')?.classList.add('hidden');
                            }}
                          >
                            12:00 PM
                          </button>
                          <button 
                            className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs font-medium hover:bg-green-800/40 flex items-center justify-center border border-green-800/50 transition-all duration-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTime('14:00:00');
                              document.getElementById('time-dropdown')?.classList.add('hidden');
                            }}
                          >
                            2:00 PM
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2 bg-black border-t border-neutral-700 flex justify-between items-center">
                      <button 
                        className="text-xs text-blue-400 hover:text-blue-300 px-2 py-1 rounded-full hover:bg-blue-900/30 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          document.getElementById('time-dropdown')?.classList.add('hidden');
                        }}
                      >
                        Close
                      </button>
                      <div className="text-xs text-neutral-400 bg-neutral-900/50 px-2 py-1 rounded-full">
                        Format: 24-hour (HH:MM:SS)
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mt-2 space-y-2">
                  <div className="text-xs text-neutral-500 bg-neutral-900/50 px-2 py-1 rounded-full inline-block self-start">HH:MM:SS (24-hour)</div>
                  <div className="grid grid-cols-3 gap-2 time-buttons">
                    <button 
                      className="text-xs bg-blue-900/30 text-blue-300 px-2 py-2 rounded hover:bg-blue-800/40 transition-all duration-200 transform hover:scale-105 border border-blue-800/50 flex items-center justify-center"
                      onClick={() => {
                        setTime('09:15:00');
                        document.getElementById('time-dropdown')?.classList.add('hidden');
                      }}
                    >
                      <svg className="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0V5z" clipRule="evenodd" />
                      </svg>
                      Market Open
                    </button>
                    <button 
                      className="text-xs bg-orange-900/30 text-orange-300 px-2 py-2 rounded hover:bg-orange-800/40 transition-all duration-200 transform hover:scale-105 border border-orange-800/50 flex items-center justify-center"
                      onClick={() => {
                        setTime('15:30:00');
                        document.getElementById('time-dropdown')?.classList.add('hidden');
                      }}
                    >
                      <svg className="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0V5z" clipRule="evenodd" />
                      </svg>
                      Market Close
                    </button>
                    <button 
                      className="text-xs bg-green-900/30 text-green-300 px-2 py-2 rounded hover:bg-green-800/40 transition-all duration-200 transform hover:scale-105 border border-green-800/50 flex items-center justify-center"
                      onClick={() => {
                        const now = new Date();
                        const hours = now.getHours().toString().padStart(2, '0');
                        const minutes = now.getMinutes().toString().padStart(2, '0');
                        const seconds = now.getSeconds().toString().padStart(2, '0');
                        setTime(`${hours}:${minutes}:${seconds}`);
                        document.getElementById('time-dropdown')?.classList.add('hidden');
                      }}
                    >
                      <svg className="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0V5z" clipRule="evenodd" />
                      </svg>
                      Current Time
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="p-3 bg-neutral-800/50 border border-neutral-700 rounded-md">
                  <div className="text-xs text-neutral-300 mb-1">📊 Stock Market Data Selection</div>
                  <div className="text-xs text-neutral-400">
                    You are selecting historical market data for backtesting and analysis. 
                    The selected expiry, date, and time will be used to retrieve market conditions from that specific moment.
                  </div>
                </div>
                
                <div className="flex space-x-2 time-buttons">
                  <Button
                    variant="outline"
                    className="border-neutral-800 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100 flex-1 transition-all duration-200"
                    onClick={() => setShowHistoricalForm(false)}
                  >
                    <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back
                  </Button>
                  <Button
                    className="bg-orange-600 hover:bg-orange-700 text-white flex-1 transition-all duration-200 flex items-center justify-center"
                    onClick={handleHistoricalDataSubmit}
                  >
                    <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Apply Selection
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}