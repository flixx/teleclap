export default {
    'slugify': function(value) {
        // Compatibly-decompose and remove combining characters.  
        value = value.normalize('NFKD').replace(/[\u0300-\u036F]/g, '');
        // Remove all non-word characters, leaving spaces and dashes. Trim and convert to lower case. 
        value = value.replace(/[^\w\s\-]+/g, '').trim().toLowerCase();
        // Replace groups of spaces and dashes with a single dash.  
        return value.replace(/[-\s]+/g, '-');
    }
  }