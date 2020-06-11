from django.shortcuts import render

from django.template import Template, Context

class Member:
    def __init__(self, name, age):
        self.name = name
        self.age = age

def memb_reg(request):
    members = {}
    members[2] = Member("Kurt", 64)
    members[5] = Member("Anne", 39)
    members[3] = Member("Berit", 15)
    members[8] = Member("Julius_Caesar", 2113)

    context = {
                    'NUMBER_OF_MEMBERS': len(members),
                    'MEMBER_INFO': members,  # Important, note the last ","!
                }

    return render(request, 'bobbin_lace/memb_reg.html', context)