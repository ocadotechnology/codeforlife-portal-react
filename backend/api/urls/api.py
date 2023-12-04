from django.urls import path, re_path

from ..views.api import (
    AnonymiseOrphanSchoolsView,
    InactiveUsersView,
    RemoveFakeAccounts,
    registered_users,
    last_connected_since,
    number_users_per_country
)


urlpatterns = [ 
    re_path(
        rf"^schools/anonymise/(?P<start_id>\d+)/$",
        AnonymiseOrphanSchoolsView,
        name="anonymise_orphan_schools",
    ),
    path(
        "users/inactive/",
        InactiveUsersView,
        name="inactive_users",
    ),
    path(
        "removeFakeAccounts/",
        RemoveFakeAccounts,
        name="remove_fake_accounts",
    ),
    re_path(
        rf"^registered/(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})/$",
        registered_users,
        name="registered-users",
    ),
    re_path(
        rf"^lastconnectedsince/(?P<year>\d{4})/(?P<month>\d{2})/(?P<day>\d{2})/$",
        last_connected_since,
        name="last-connected-since",
    ),
    re_path(
        rf"^userspercountry/(?P<country>(AF|AX|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BQ|BA|BW|BV|BR|IO|BN|BG|BF|BI|KH|CM|CA|CV|KY|CF|TD|CL|CN|CX|CC|CO|KM|CG|CD|CK|CR|CI|HR|CU|CW|CY|CZ|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KP|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|RE|RO|RU|RW|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SX|SK|SI|SB|SO|ZA|GS|SS|ES|LK|SD|SR|SJ|SZ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|US|UM|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW))/$",
        number_users_per_country,
        name="number_users_per_country",
    ),
]
