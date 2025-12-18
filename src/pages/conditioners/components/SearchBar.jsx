import { memo } from 'react';
import { Search, X } from 'lucide-react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const SearchBar = memo(({ value, onChange, onClear }) => {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Search className="w-5 h-5" />
      </div>
      <Input
        type="text"
        placeholder="Search by name, model, or serial number..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10"
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;