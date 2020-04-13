export default {
    'slugify': function(value) {
        // Compatibly-decompose and remove combining characters.  
        value = value.normalize('NFKD').replace(/[\u0300-\u036F]/g, '');
        // Remove all non-word characters, leaving spaces and dashes. Trim and convert to lower case. 
        value = value.replace(/[^\w\s-]+/g, '').trim().toLowerCase();
        // Replace groups of spaces and dashes with a single dash.  
        return value.replace(/[-\s]+/g, '-');
    },
    'hashCode': function(value) {
        var url = new URL(value)
        var room = url.pathname.replace(/^.*[\\/]/, '')
        var hash = 0, i, chr;
        for (i = 0; i < room.length; i++) {
            chr   = room.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        if (hash < 0) {
            hash = -hash 
        }
        return hash;
    }
}