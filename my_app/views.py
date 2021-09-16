from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


def home(request):
  return render(request,"email_sender.html")

@csrf_exempt
def sendMail(request):
  if request.method == "POST":
    to = request.POST.get("to")
    from_mail = request.POST.get("from")
    subject = request.POST.get("subject")
    body = request.POST.get("body")
   
    send_mail(subject,body,from_mail,[to])
    return JsonResponse({"msg":"Sent"})
    
  