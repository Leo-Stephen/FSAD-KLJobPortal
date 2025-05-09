package klu.model;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTManager {
	public final String SEC_KEY = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890MKDJSHIEUFBEICBWIEOWDWUU";
	  public final SecretKey key = Keys.hmacShaKeyFor(SEC_KEY.getBytes());
	  
	  public String generateToken(String email)
	  {
	    Map<String, String> data = new HashMap<String, String>();
	    data.put(email, email);
	    
	    return Jwts.builder()
	        .setClaims(data)
	        .setIssuedAt(new Date())
	        .setExpiration(new Date(new Date().getTime() + 3600000))
	        .signWith(key)
	        .compact();
	  }

	  public String validateToken(String token) {
	    try {
	      Claims claims = Jwts.parserBuilder()
	          .setSigningKey(key)
	          .build()
	          .parseClaimsJws(token)
	          .getBody();
	      
	      // Get the first key from claims as it contains the email
	      return claims.keySet().iterator().next();
	    } catch (Exception e) {
	      return "401";
	    }
	  }
}
