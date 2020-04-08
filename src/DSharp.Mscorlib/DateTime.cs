﻿using System.Runtime.CompilerServices;

namespace System
{
    [ScriptIgnoreNamespace]
    [ScriptImport]
    [ScriptName("Date")]
    public struct DateTime
    {
        public extern static implicit operator Date(DateTime d);

        public extern static implicit operator DateTime(Date d);

        [ScriptField]
        [ScriptAlias("ss.DateTime.Now")]
        public extern static DateTime Now { get; }

        [ScriptField]
        [ScriptAlias("ss.DateTime.Today")]
        public extern static DateTime Today { get; }

        [ScriptAlias("ss.DateTime.Equals")]
        public extern static bool Equals(DateTime d1, DateTime d2);

        public DateTime(int year, int month, int day) { }

        public DateTime(int year, int month, int day, int hour, int minute, int second) { }

        public DateTime(int year, int month, int day, int hour, int minute, int second, int millisecond) { }

        [ScriptAlias("Year")]
        public extern int Year { get; }

        [ScriptAlias("Month")]
        public extern int Month { get; }

        [ScriptAlias("Day")]
        public extern int Day { get; }

        [ScriptAlias("DayOfWeek")]
        public extern DayOfWeek DayOfWeek { get; }

        [ScriptAlias("Hour")]
        public extern int Hour { get; }

        [ScriptAlias("Minute")]
        public extern int Minute { get; }

        [ScriptAlias("Second")]
        public extern int Second { get; }

        [ScriptAlias("Millisecond")]
        public extern int Millisecond { get; }

        [ScriptAlias("ss.DateTime.AddMilliseconds")]
        public extern DateTime AddMilliseconds(double value);

        [ScriptAlias("ss.DateTime.AddSeconds")]
        public extern DateTime AddSeconds(double value);

        [ScriptAlias("ss.DateTime.AddMinutes")]
        public extern DateTime AddMinutes(double value);

        [ScriptAlias("ss.DateTime.AddHours")]
        public extern DateTime AddHours(double value);

        [ScriptAlias("ss.DateTime.AddDays")]
        public extern DateTime AddDays(double value);

        [ScriptAlias("ss.DateTime.ToLongDateString")]
        public extern string ToLongDateString();

        [ScriptAlias("ss.DateTime.ToLongTimeString")]
        public extern string ToLongTimeString();

        [ScriptAlias("ss.DateTime.ToShortDateString")]
        public extern string ToShortDateString();

        [ScriptAlias("ss.DateTime.ToShortTimeString")]
        public extern string ToShortTimeString();

        [ScriptAlias("ss.DateTime.ToStringFormatted")]
        public override extern string ToString();

        [ScriptAlias("ss.DateTime.ToStringFormatted")]
        public extern string ToString(string format);

        [ScriptAlias("ss.DateTime.Parse")]
        public extern static DateTime Parse(string date);

        [ScriptIgnore]
        public extern static bool operator ==(DateTime left, DateTime right);

        [ScriptIgnore]
        public extern static bool operator !=(DateTime left, DateTime right);

        [ScriptIgnore]
        public extern static bool operator >=(DateTime left, DateTime right);

        [ScriptIgnore]
        public extern static bool operator <=(DateTime left, DateTime right);

        [ScriptIgnore]
        public extern static bool operator >(DateTime left, DateTime right);

        [ScriptIgnore]
        public extern static bool operator <(DateTime left, DateTime right);
    }
}
