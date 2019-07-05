﻿function DateTime() { }

ss.createPropertyGet(DateTime, 'Now', function()
{
    return new Date();
});

ss.createPropertyGet(DateTime, 'Today', function()
{
    var today = DateTime.Now;
    today.setHours(0, 0, 0, 0);

    return today;
});

DateTime.Equals = function (d1, d2)
{
    var parsedDate1 = DateTime._parseIfString(d1);
    var parsedDate2 = DateTime._parseIfString(d2);

    if (parsedDate1 == null || parsedDate2 == null)
    {
        return ss.compareDates(parsedDate1, parsedDate2);
    }

    return parsedDate1.getTime() === parsedDate2.getTime();
};

DateTime.GetDayOfWeek = function(date)
{
    date = DateTime._parseIfString(date);

    return date.getDay();
};

DateTime.AddMilliseconds = function(date, value)
{
    var parsedDate = DateTime._parseIfString(date);

    if (parsedDate == null)
    {
        return new Date();
    }

    return new Date(value + parsedDate.getTime());
};

DateTime.AddSeconds = function(date, value)
{
    return DateTime.AddMilliseconds(date, value * 1E3); // 1E3 = 1s
};

DateTime.AddMinutes = function(date, value)
{
    return DateTime.AddMilliseconds(date, value * 6E4); // 6E4 = 1m
};

DateTime.AddHours = function(date, value)
{
    return DateTime.AddMilliseconds(date, value * 36E5); // 36E5 = 1h
};

DateTime.AddDays = function(date, value)
{
    return DateTime.AddMilliseconds(date, value * 864E5); // 864E5 = 1d
};

DateTime.ToLongDateString = function(date)
{
    return DateTime.ToStringFormatted(date, DateTime._getFormatter(ss.culture.current.dtf.ld));
};

DateTime.ToLongTimeString = function(date)
{
    return DateTime.ToStringFormatted(date, DateTime._getFormatter(ss.culture.current.dtf.lt));
};

DateTime.ToShortDateString = function(date)
{
    return DateTime.ToStringFormatted(date, DateTime._getFormatter(ss.culture.current.dtf.sd));
};

DateTime.ToShortTimeString = function(date)
{
    return DateTime.ToStringFormatted(date, DateTime._getFormatter(ss.culture.current.dtf.st));
};

DateTime.ToStringFormatted = function(date, formatter)
{
    if (arguments.length === 1)
    {
        return DateTime.ToString(date);
    }

    date = DateTime._parseIfString(date);

    return ss.format(ss.culture.current, formatter, date);
};

DateTime.ToString = function(date)
{
    if (date == null)
    {
        return '';
    }

    return DateTime._parseIfString(date).toString();
};

DateTime._getFormatter = function(pattern)
{
    return '{0:' + pattern + '}';
};

DateTime._parseIfString = function(obj)
{
    if (ss.typeOf(obj) === Date)
    {
        return obj;
    }

    if (ss.typeOf(obj) === String)
    {
        var dateString = obj;

        if (!(ss.endsWith(dateString, 'z') || ss.endsWith(dateString, 'Z')))
        {
            dateString += 'Z';
        }

        var date = new Date(dateString);

        if (isNaN(date))
        {
            date = DateTime._manuallyParseDateFromJsonString(obj);
        }

        return date;
    }

    return null;
};

DateTime._manuallyParseDateFromJsonString = function(str)
{
    var s = str.split(new RegExp('\\D'));
    var s2 = new Array(7);

    for (var i = 0; i < 7; ++i)
    {
        s2[i] = (s[i] == null) ? 0 : parseInt(s[i]);
    }

    return new Date(Date.UTC(s2[0], s2[1] - 1, s2[2], s2[3], s2[4], s2[5]));
};
